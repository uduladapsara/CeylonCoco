import { request, getToken } from "./api.js";

const getCurrentWeather = (location) =>
  request(`/api/weather/current?location=${location}`, {
    token: getToken()
  });

const getForecast = (location) =>
  request(`/api/weather/forecast?location=${location}`, {
    token: getToken()
  });

export { getCurrentWeather, getForecast };
