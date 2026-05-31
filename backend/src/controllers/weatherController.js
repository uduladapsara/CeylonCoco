const Weather = require("../models/Weather");
const {
	fetchCurrentWeather,
	fetchForecast
} = require("../services/weatherService");

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

const upsertWeather = async (
	location,
	current,
	forecast
) => {
	const update = {
		location,
		fetchedAt: new Date(),
		source: "OpenWeather"
	};

	if (current) {
		update.current = current;
	}

	if (forecast) {
		update.forecast = forecast;
	}

	return Weather.findOneAndUpdate(
		{ location },
		update,
		{ new: true, upsert: true }
	);
};

exports.createWeatherCache = async (req, res) => {
	try {
		const { location, current, forecast } =
			req.body;

		const entry = await upsertWeather(
			location,
			current,
			forecast
		);

		res.status(201).json(entry);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getCurrentWeather = async (req, res) => {
	try {
		const location = req.query.location;

		const current = await fetchCurrentWeather(
			location
		);

		const entry = await upsertWeather(
			location,
			current,
			null
		);

		res.json(entry);
	} catch (error) {
		const cached = await Weather.findOne({
			location: req.query.location
		}).sort({ fetchedAt: -1 });

		if (cached) {
			return res.json(cached);
		}

		handleError(res, error);
	}
};

exports.getForecast = async (req, res) => {
	try {
		const location = req.query.location;

		const forecast = await fetchForecast(
			location
		);

		const entry = await upsertWeather(
			location,
			null,
			forecast
		);

		res.json(entry ? entry.forecast : []);
	} catch (error) {
		const cached = await Weather.findOne({
			location: req.query.location
		}).sort({ fetchedAt: -1 });

		if (cached) {
			return res.json(cached.forecast || []);
		}

		handleError(res, error);
	}
};

exports.getWeeklyReport = async (req, res) => {
	try {
		const location = req.query.location;

		const entry = await Weather.findOne({
			location
		}).sort({ fetchedAt: -1 });

		if (!entry) {
			return res.json([]);
		}

		res.json(entry.forecast);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getRiskReport = async (req, res) => {
	try {
		const location = req.query.location;

		const entry = await Weather.findOne({
			location
		}).sort({ fetchedAt: -1 });

		if (!entry) {
			return res.json({
				riskDays: 0,
				totalDays: 0
			});
		}

		const riskDays = entry.forecast.filter(
			(day) => (day.rainChance || 0) >= 60
		).length;

		res.json({
			riskDays,
			totalDays: entry.forecast.length
		});
	} catch (error) {
		handleError(res, error);
	}
};
