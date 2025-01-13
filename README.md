# About Weather App.

This is a simple weather app that will query the OpenWeatherAPI () and return weather data for an input city/country pair.

Desktop view:
![image](https://github.com/user-attachments/assets/714b4cd7-496f-4da8-9353-65ea07962b8a)

Mobile view:
![image](https://github.com/user-attachments/assets/1c6280db-7778-4dbd-985e-5a6db6d8be97)

When the website is first opened, an API call will be made to OpenWeatherAPI to obtain and display weather data for the default city and country.
Currently, the default city/country is set to Singapore, though this may be changed in src/constants/constants.js.

Past searches may be viewed in the "Search History" section of the app. To make the display more user friendly, only the most recent 5 searches are displayed to the users, 
although further searches are still being stored and will displayed if the most recent 5 searches are deleted. The display limit for search history
may also be changed in src/constants/constants.js.

API calls to OpenWeatherAPI requires an APPID. This may be changed in constants.js as well.

## Running the application

To run the application, execute the following command in the root directory of the project:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Note that connection to World Wide Web is required to use the application as API calls will me made to OpenWeatherAPI.

The page will reload when you make changes.\
You may also see any lint errors in the console.

