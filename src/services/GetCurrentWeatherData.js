import { openWeatherMapAxiosWrapper } from "./_axios";

async function getCurrentWeatherData(city, country, appId, units) { // Convert temperatures to celsius for now
  const { openWeatherMapGet } = openWeatherMapAxiosWrapper();
  const targetUrl = `/data/2.5/weather?q=${city},${country}&units=${units}&APPID=${appId}`;
  const response = await openWeatherMapGet(targetUrl);
  return response?.data;
}

export { getCurrentWeatherData };