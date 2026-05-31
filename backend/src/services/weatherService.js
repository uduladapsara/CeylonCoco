const axios = require("axios");
const {
	baseUrl,
	apiKey,
	units
} = require("../config/weatherApi");

const ensureKey = () => {
	if (!apiKey) {
		throw new Error(
			"WEATHER_API_KEY is not set"
		);
	}
};

const fetchCurrentWeather = async (location) => {
	ensureKey();

	const response = await axios.get(
		`${baseUrl}/data/2.5/weather`,
		{
			params: {
				q: location,
				appid: apiKey,
				units
			}
		}
	);

	const data = response.data;

	return {
		temperature: data.main?.temp,
		humidity: data.main?.humidity,
		windSpeed: data.wind?.speed,
		condition: data.weather?.[0]?.main,
		rainChance: data.clouds?.all
	};
};

const fetchForecast = async (location) => {
	ensureKey();

	const response = await axios.get(
		`${baseUrl}/data/2.5/forecast`,
		{
			params: {
				q: location,
				appid: apiKey,
				units
			}
		}
	);

	const list = response.data?.list || [];

	return list.map((item) => ({
		date: new Date(item.dt * 1000),
		temperature: item.main?.temp,
		humidity: item.main?.humidity,
		windSpeed: item.wind?.speed,
		condition: item.weather?.[0]?.main,
		rainChance: item.clouds?.all
	}));
};

module.exports = {
	fetchCurrentWeather,
	fetchForecast
};
