# About Weather App.

This is a simple weather app that will query the OpenWeatherAPI () and return weather data for an input city/country pair.

Desktop view:  
![image](https://github.com/user-attachments/assets/714b4cd7-496f-4da8-9353-65ea07962b8a)

Mobile view:  
![image](https://github.com/user-attachments/assets/1c6280db-7778-4dbd-985e-5a6db6d8be97)

When the website is first opened, an API call will be made to OpenWeatherAPI to obtain and display weather data for the default city and country.
Currently, the default city/country is set to Singapore, though this may be changed in src/constants/constants.js.  

To make a search, key in the city name and optionally, select a value in the country input dropdown. I decided to implement the country field as a dropdown to
simplify the conversion of country names to country codes and make the app more user-friendly. After that, click on the search button. If a search is valid, 
the weather data for the required city/country pair will be displayed. Otherwise, an alert banner will be displayed.  

![image](https://github.com/user-attachments/assets/bed17cd9-cbf0-46a0-8318-5063589e8f30)


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


