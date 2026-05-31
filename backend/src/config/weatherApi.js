const baseUrl =
	process.env.WEATHER_API_URL ||
	"https://api.openweathermap.org";

const apiKey = process.env.WEATHER_API_KEY;

const units = process.env.WEATHER_API_UNITS || "metric";

module.exports = {
	baseUrl,
	apiKey,
	units
};
