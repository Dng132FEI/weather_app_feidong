import React from 'react';
import { useState } from "react";

import Searchbar from './components/Searchbar';
import WeatherDisplay from './components/WeatherDisplay'
import SearchHistory from './components/SearchHistory';

import Alert from 'react-bootstrap/Alert';

import { getCurrentWeatherData } from './services/GetCurrentWeatherData';

import { APPID } from './constants/constants';

import "./App.css";

import moment from 'moment';

export default function App() {
  /** Value in city search bar */
  const [city, setCity] = useState("");

  /** Value in country search bar */
  const [country, setCountry] = useState("");

  /** 
   * Necessary weather data extracted from OpenWeatherAPI that is to be 
   * dispaleyd in WeatherDisplay component. 
   */
  const [weatherData, setWeatherData] = useState({});

  /** 
   * Boolean to indicate whether the "Not found" red banner (Bootstrap Alert)
   * should be shown.
   */
  const [showInvalidSearchAlert, setShowInvalidSearchAlert] = useState(false);

  /** Search history array, pre-populated with some mock values for now */
  const [history, setHistory] = useState([
    {
      city: "Mumbai",
      countryCode: "IN",
      searchTime: "2025-01-09 03:15 PM"
    },
    {
      city: "Kyiv",
      countryCode: "UA",
      searchTime: "2025-01-09 03:18 PM"
    },
    {
      city: "Fuzhou",
      countryCode: "CN",
      searchTime: "2025-01-09 03:22 PM"
    }
  ]);

  /**
   * Makes an API call to OpenWeatherAPI based on function inputs to obtain and 
   * update current weather data in WeatherDisplay component.
   * If the country searched is already in the search history, remove that search history record
   * and add the current search record in so that the time when the country is searched is updated.
   * @param {*} getWeatherDataCity "city" variable to be passed into API call to OpenWeatherAPI.
   * @param {*} getWeatherDataCountry "country code" variable to be passed into API call to OpenWeatherAPI.
   * @param {*} units "metric", "imperial" or "standard"
   */
  const callGetWeatherData = (getWeatherDataCity, getWeatherDataCountry, units) => {
    getCurrentWeatherData(getWeatherDataCity, getWeatherDataCountry, APPID, units).then((value) => {
      var queryTime = moment.unix(value?.dt).format("YYYY-MM-DD hh:mm a");
      const newWeatherData = { // Extract only data that we need
        city: value?.name,
        countryCode: value?.sys?.country,
        weatherGroup: value?.weather?.[0]?.main,
        description: value?.weather?.[0]?.description,
        temp: value?.main?.temp,
        tempMax: value?.main?.temp_max,
        tempMin: value?.main?.temp_min,
        tempUnit: "°C", // For extendibility to other units.
        humidity: value?.main?.humidity,
        displayTime: queryTime
      };
      setWeatherData(newWeatherData);
      let newHistory = [...history];
      let historyRepeatRecordIndex = newHistory.findIndex(record=>record.city === newWeatherData.city);
      // If the country searched is already in the search history, remove that search history record
      // We will add back the same country later at the start of the history array with updated search time.
      if (historyRepeatRecordIndex !== -1) {
        newHistory.splice(historyRepeatRecordIndex, 1);
      }
      newHistory.unshift({
        city: newWeatherData?.city,
        countryCode: newWeatherData?.countryCode,
        searchTime: newWeatherData?.displayTime
      })
      setHistory(newHistory);
      setShowInvalidSearchAlert(false);
    }).catch((e)=>{
      setShowInvalidSearchAlert(true);
      console.error(e.message);
    });
  }

  /**
   * Pass the values of the city and country state variables
   * to the callGetWeatherData function in order to make an API call
   * to OpenWeatherAPI and update weather data in WeatherDisply component.
   */
  const searchSubmitHandler = async()=>{
    callGetWeatherData(city, country, "metric");
  }

  /**
   * When the user clicks on the search button within a search history record in
   * the UI, pass the values of the city and country (country code) variables 
   * from the target search history record into the callGetWeatherData function
   * in order to make an API call to OpenWeatherAPI and update weather data in
   * WeatherDisply component.
   */
  const searchUsingHistoryRecord = async(recordIndex)=>{
    callGetWeatherData(history?.[recordIndex]?.city, history?.[recordIndex]?.country, "metric");
  }

  /**
   * When the user clicks on the delete button within a search history record in
   * the UI, remove the target search history record from the "history" (search history)
   * array.
   */
  const deleteHistoryRecord = async(recordIndex)=>{
    let newHistory = [...history];
    newHistory.splice(recordIndex, 1);
    setHistory(newHistory);
  }

  return (
    <div className="p-4">

      {/* Page header */}
      <div className="fw-bold pt-3 pb-1 border-bottom">Today's weather</div>

      {/* Search bar with submit and reset buttons */}
      <Searchbar
        setCity={setCity}
        setCountry={setCountry}
        searchSubmit={searchSubmitHandler}
      ></Searchbar>

      {/* Display the "Not found" red banner (Bootstrap Alert) if necessary */}
      {showInvalidSearchAlert ? (
        <div className="mt-4">
          <Alert 
            variant="danger" 
            onClose={() => setShowInvalidSearchAlert(false)} 
            dismissible
          >Not found</Alert>
        </div>
      ) :<></>}

      {/* Display weather data if data is obtained successfully from OpenWeatherAPI */}
      {Object.keys(weatherData).length !== 0 ? (
        <WeatherDisplay
          city={weatherData.city}
          countryCode={weatherData.countryCode}
          weatherGroup={weatherData.weatherGroup}
          description={weatherData.description}
          temp={weatherData.temp}
          tempMax={weatherData.tempMax}
          tempMin={weatherData.tempMin}
          tempUnit={weatherData.tempUnit}
          humidity={weatherData.humidity}
          displayTime={weatherData.displayTime}
        ></WeatherDisplay>
      ) :<></>}

      {/* Search history section */}
      <SearchHistory 
        searchUsingHistoryRecord={searchUsingHistoryRecord}
        deleteHistoryRecord={deleteHistoryRecord}
        history={history}
      ></SearchHistory>
    </div>
  )
}

