import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { COUNTRIES_ISO_DATA } from "../constants/constants";

import "./Searchbar.css";

/**
 * Searchbar component containing the "City" input and the "Country" dropdown,
 * as well as the "Search" and "Clear" button.
 * @param { Object } props Component props
 * @param { function } props.setCity Setter for the "city" state variable from parent component.
 * @param { function } props.setCountry Setter for the "country" state variable from parent component.
 * @param { function } props.searchSubmit Handler for Search button click event.
 * @param { boolean } props.isMobile For toggling mobile view.
 * @returns JSX for the Searchbar component.
 */
const Searchbar = ({ setCity, setCountry, searchSubmit, isMobile }) => {
  return (
    <Form className="search-bar">

      {isMobile ? ( 
        <>
          {/* "City" user input (text bar) */}
          <div className="weather-app-component-input search-bar-first-row">
            <Form.Group controlId="city">
              <Form.Label className="weather-app-input-label">City:</Form.Label>
              <Form.Control
                className="weather-app-transparent-input"
                type="text"
                size="sm"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
          </div>
          
          <div className="search-bar-row">
            {/* "Country" user input (dropdown) */}
            <div className="weather-app-component-input">
              <Form.Group controlId="country">
                <Form.Label className="weather-app-input-label">Country (optional):</Form.Label>
                <Form.Select
                  className="weather-app-transparent-select"
                  variant="outline-secondary"
                  title="Dropdown"
                  id="input-group-dropdown-1"
                  size="sm"
                  onChange={(e) => {setCountry(e.target.value)}}
                >
                  <option value="">No country selected</option>
                  {COUNTRIES_ISO_DATA.map((countryData, index)=>(<option key={index} value={countryData?.code}>{countryData?.name}</option>))};
                </Form.Select>
              </Form.Group>
            </div>

            {/* Search button. If clicked, make an API call to OpenWeatherAPI in the parent component. */}
            <Button 
              className="weather-app-search-button"
              variant="secondary" 
              size="lg" 
              type="button"
              onClick={searchSubmit}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </Button>
          </div>
        </>        
      ): (
        <div className="search-bar-row">
          {/* "City" user input (text bar) */}
          <div className="weather-app-component-input">
            <Form.Group controlId="city">
              <Form.Label className="weather-app-input-label">City:</Form.Label>
              <Form.Control
                className="weather-app-transparent-input"
                type="text"
                size="sm"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
          </div>

          {/* "Country" user input (dropdown) */}
          <div className="weather-app-component-input">
            <Form.Group controlId="country">
              <Form.Label className="weather-app-input-label">Country (optional):</Form.Label>
              <Form.Select
                className="weather-app-transparent-select"
                variant="outline-secondary"
                title="Dropdown"
                id="input-group-dropdown-1"
                size="sm"
                onChange={(e) => {setCountry(e.target.value)}}
              >
                <option value="">No country selected</option>
                {COUNTRIES_ISO_DATA.map((countryData, index)=>(<option key={index} value={countryData?.code}>{countryData?.name}</option>))};
              </Form.Select>
            </Form.Group>
          </div>

          {/* Search button. If clicked, make an API call to OpenWeatherAPI in the parent component. */}
          <Button  
            className="weather-app-search-button"
            variant="secondary" 
            size="lg" 
            type="button"
            onClick={searchSubmit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </Button>
        </div>
      )}

    </Form>
  )
}

export default Searchbar

