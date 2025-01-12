import axios from "axios";

const openWeatherMapAxiosWrapper = () => {
  const openWeatherMapAxios = axios.create({
    baseURL: "http://api.openweathermap.org"
  })

  // Configure axios instance request handling
  openWeatherMapAxios.interceptors.request.use(
    (request) => request,
    (error) => Promise.reject(error)
  )

  // Configure axios instance response handling
  openWeatherMapAxios.interceptors.response.use(
    (request) => request,
    (error) => Promise.reject(error)
  )

  const openWeatherMapGet = async (path) => {
    try {
      const response = await openWeatherMapAxios.get(path);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const openWeatherMapPost = async (path, reqBody = {}) => {
    try {
      const response = await openWeatherMapAxios.post(path, reqBody);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return { openWeatherMapGet, openWeatherMapPost };
}

export default openWeatherMapAxiosWrapper;