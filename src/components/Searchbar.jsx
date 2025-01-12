import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { COUNTRIES_ISO_DATA } from "../constants/constants"

/**
 * Searchbar component containing the "City" input and the "Country" dropdown,
 * as well as the "Search" and "Clear" button.
 * @param { Object } props Component props
 * @param { function } props.setCity Setter for the "city" state variable from parent component.
 * @param { function } props.setCountry Setter for the "country" state variable from parent component.
 * @param { function } props.searchSubmit Handler for Search button click event.
 * @returns JSX for the Searchbar component.
 */
const Searchbar = ({ setCity, setCountry, searchSubmit }) => {
  return (
    <Form className="pt-3 pb-4">

      <Row className="d-flex align-items-center">

        {/* "City" user input (text bar) */}
        <Col md="2">
          <Form.Group controlId="city" className="d-flex align-items-center gap-2">
            <Form.Label className="white-space-nowrap mb-0">City:</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              size="sm"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* "Country" user input (dropdown) */}
        <Col md="4">
          <Form.Group controlId="country" className="d-flex align-items-center gap-2">
            <Form.Label className="white-space-nowrap mb-0">Country (optional):</Form.Label>
            <Form.Select
              variant="outline-secondary"
              title="Dropdown"
              id="input-group-dropdown-1"
              size="md"
              onChange={(e) => {setCountry(e.target.value)}}
            >
              <option value="">No country selected</option>
              {COUNTRIES_ISO_DATA.map((countryData)=>(<option value={countryData?.code}>{countryData?.name}</option>))};
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Button section */}
        <Col md="6" className="d-flex align-items-center gap-3">

          {/* Search button. If clicked, make an API call to OpenWeatherAPI in the parent component. */}
          <Button 
            block 
            variant="secondary" 
            size="sm" 
            type="button"
            onClick={searchSubmit}
          >
            Search
          </Button>

          {/*Clear button. If clicked, set both city and country to empty string.*/}
          <Button 
            block
            variant="secondary" 
            size="sm" 
            type="button" 
            onClick={() => {setCity(""); setCountry("");}}
          >
            Clear
          </Button>

        </Col>
  
      </Row>

    </Form>
  )
}

export default Searchbar

