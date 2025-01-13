import React from 'react';

import "./WeatherDisplay.css";

/**
 * WeatherDisplay component, section on the webpage displaying weather data.
 * Only valid when weatherDisplay is zero.
 * @param { Object } props Component props
 * @param { String } props.city Weather display city.
 * @param { String } props.countryCode Weather display country code
 * @param { String } props.weatherGroup "main" from API response. See https://openweathermap.org/weather-conditions for details ().
 * @param { String } props.description "description" from API response. See https://openweathermap.org/weather-conditions for details.
 * @param { String } props.temp Current temperature (in tempUnit, round off to nearest integer)
 * @param { String } props.tempMin Lowest temperature (in tempUnit, round off to 2 decimal places)
 * @param { String } props.tempMax Highest teperature (in tempUnit, round off to 2 decimal places)
 * @param { String } props.tempUnit "°C" or "°F"
 * @param { String } props.humidity Humidity
 * @param { String } props.displayTime Timing to be displayed in UI.
 * @param { boolean } props.isMobile For toggling mobile view.
 * @returns JSX for WeatherDisplay component.
 */
const WeatherDisplay = ({ 
  city, 
  countryCode,
  weatherGroup, 
  description, 
  temp, 
  tempMin, 
  tempMax, 
  tempUnit, 
  humidity, 
  displayTime,
  isMobile
}) => {
  return (isMobile ? (
    <div className="weather-display-component-mobile">
      <div className="weather-display-component-left">
        <div className="weather-header-mobile">Today's weather</div>
        <div className="main-display-mobile">{ temp }{ tempUnit }</div>
        <div className="sub-display-mobile">{ weatherGroup }</div>
        <div className="high-low-temperature-text-mobile">H: { tempMax }{ tempUnit }, L: { tempMin }{ tempUnit }</div>
        <div className="weather-data-semibold-mobile">{ city }, { countryCode }</div>
      </div>
      <div className="weather-display-component-right">
        <div className="weather-data-mobile">{ description }</div>
        <div className="weather-data-mobile">Humidity: { humidity }%</div>
        <div className="weather-data-mobile">{ displayTime }</div>
      </div>
      {["Clouds", "Clear"].includes(weatherGroup) 
        ? <img className="image-mobile" src="/sun.png" alt="" width="145" height="150" />
        : <img className="image-mobile" src="/cloud.png" alt="" width="145" height="150" />
      }
    </div>
  ) : (
    <div className="weather-display-component">
      <div className="weather-header">Today's weather</div>
      <div className="main-display">{ temp }{ tempUnit }, { weatherGroup }</div>
      <div className="high-low-temperature-text">H: { tempMax }{ tempUnit } L: { tempMin }{ tempUnit }</div>
      <div className="weather-data-row">
        <div className="weather-data-semibold">{ city }, { countryCode }</div>
        <div className="weather-data">{ displayTime }</div>
        <div className="weather-data">Humidity: { humidity }%</div>
        <div className="weather-data">{ description }</div>
      </div>
      {["Clouds", "Clear"].includes(weatherGroup) 
        ? <img className="image" src="/sun.png" alt="" width="215" height="220" />
        : <img className="image" src="/cloud.png" alt="" width="215" height="220" />
      }
    </div>
  ))

}

export default WeatherDisplay
