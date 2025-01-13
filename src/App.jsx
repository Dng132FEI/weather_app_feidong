import React, { useCallback } from 'react';
import { useState, useEffect } from "react";

import Searchbar from './components/Searchbar';
import WeatherDisplay from './components/WeatherDisplay'
import SearchHistory from './components/SearchHistory';
import Alert from 'react-bootstrap/Alert';

import { getCurrentWeatherData } from './services/GetCurrentWeatherData';

import { APPID, MOBILE_VIEW_THRESHOLD_WIDTH, DEFAULT_CITY, DEFAULT_COUNTRY } from './constants/constants';

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
      city: "Ningbo",
      countryCode: "CN",
      searchTime: "2025-01-09 03:15 PM"
    },
    {
      city: "Kyiv",
      countryCode: "UA",
      searchTime: "2025-01-09 03:18 PM"
    }
  ]);
  
  /** 
   * Boolean to indicate whether the current screen is mobile view.
   */
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_VIEW_THRESHOLD_WIDTH);

  /**
   * Makes an API call to OpenWeatherAPI based on function inputs to obtain and 
   * update current weather data in WeatherDisplay component.
   * If the country searched is already in the search history, remove that search history record
   * and add the current search record in so that the time when the country is searched is updated.
   * If no search result is returned from OpenWeatherAPI or if an error occurred while making the API call,
   * display the "Not found" alert for 5 seconds.
   * @param { String } getWeatherDataCity "city" variable to be passed into API call to OpenWeatherAPI.
   * @param { String } getWeatherDataCountry "country code" variable to be passed into API call to OpenWeatherAPI.
   * @param { String } units "metric", "imperial" or "standard"
   */
  const callGetWeatherData = async(getWeatherDataCity, getWeatherDataCountry, units) => {
    getCurrentWeatherData(getWeatherDataCity, getWeatherDataCountry, APPID, units).then((value) => {
      var queryTime = moment.unix(value?.dt).format("YYYY-MM-DD hh:mm a");
      const newWeatherData = { // Extract only data that we need
        city: value?.name,
        countryCode: value?.sys?.country,
        weatherGroup: value?.weather?.[0]?.main,
        description: value?.weather?.[0]?.description.charAt(0).toUpperCase() + value?.weather?.[0]?.description.slice(1),
        temp: Math.round(value?.main?.temp),
        tempMax: Math.round(value?.main?.temp_max),
        tempMin: Math.round(value?.main?.temp_min),
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
      setShowInvalidSearchAlert(false); // Hide "Not found" alert if still displaying.
    }).catch((e)=>{
      setShowInvalidSearchAlert(true);
      setTimeout(() => {
        setShowInvalidSearchAlert(false);
        }, 5000); // Display "Not found" alert for 5 seconds.
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

  /**
   * Set screen to mobile view if window width < 600px.
   */
  const updateIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_VIEW_THRESHOLD_WIDTH);
  }, []);

  /**
   * When the site is first loaded, obtain weather data for default city
   * and set up event listener for "updateIsMobile". Also execute updateIsMobile()
   * once to immediately check the screen width to verify if mobile view should be
   * displayed.
   */
  useEffect(() => {
    callGetWeatherData(DEFAULT_CITY, DEFAULT_COUNTRY, "metric"); // Load default city's weather data.
    window.addEventListener("resize", updateIsMobile);
    updateIsMobile();
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateIsMobile]);

  return (
    <div className="weather-app-page" >
      <div className="weather-app-contents">

        {/* Search bar with submit and reset buttons */}
        <Searchbar
          className="customSearchBar"
          setCity={setCity}
          setCountry={setCountry}
          searchSubmit={searchSubmitHandler}
          isMobile={isMobile}
        ></Searchbar>

        {/* Display the "Not found" red banner (Bootstrap Alert) if necessary */}
        {showInvalidSearchAlert ? (
          <div className="invalid-search-alert">
            <Alert 
              variant="danger" 
              onClose={() => setShowInvalidSearchAlert(false)} 
              dismissible
            >Not found</Alert>
          </div>
        ) :<></>}

        <div className="weather-app-component">
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
              isMobile={isMobile}
            ></WeatherDisplay>
          ) :<></>}

          {/* Search history section */}
          <SearchHistory 
            searchUsingHistoryRecord={searchUsingHistoryRecord}
            deleteHistoryRecord={deleteHistoryRecord}
            history={history}
            isMobile={isMobile}
          ></SearchHistory>
        </div>
      </div>
    </div>
  )
}

