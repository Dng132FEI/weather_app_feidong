import React from 'react'

import Card from 'react-bootstrap/Card'

/**
 * WeatherDisplay component, section on the webpage displaying weather data.
 * Only valid when weatherDisplay is zero.
 * @param { Object } props Component props
 * @param { String } props.city Weather display city.
 * @param { String } props.countryCode Weather display country code
 * @param { String } props.weatherGroup "main" from API response. See https://openweathermap.org/weather-conditions for details ().
 * @param { String } props.description "description" from API response. See https://openweathermap.org/weather-conditions for details.
 * @param { String } props.tempMin Lowest temperature (in tempUnit)
 * @param { String } props.tempMax Highest teperature (in tempUnit)
 * @param { String } props.tempUnit "°C" or "°F"
 * @param { String } props.humidity Humidity
 * @param { String } props.displayTime Timing to be displayed in UI.
 * @returns JSX for WeatherDisplay component.
 */
const WeatherDisplay = ({ 
  city, 
  countryCode,
  weatherGroup, 
  description, 
  tempMin, 
  tempMax, 
  tempUnit, 
  humidity, 
  displayTime 
}) => {
  return (
    <Card className="p-3">
      <Card.Text className="mb-0">{city}, {countryCode}</Card.Text>
      <Card.Text className="h2 fw-bold mb-3">{weatherGroup}</Card.Text>
      <Card.Text className="mb-0">Description: { description }</Card.Text>
      <Card.Text className="mb-0">Temperature: { tempMin }{ tempUnit } ~ { tempMax }{ tempUnit }</Card.Text>
      <Card.Text className="mb-0">Humidity:    { humidity }%</Card.Text>
      <Card.Text className="mb-0">Time:        { displayTime }</Card.Text>
    </Card>
  )
}

export default WeatherDisplay
