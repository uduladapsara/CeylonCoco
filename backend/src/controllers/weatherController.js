const Weather = require("../models/Weather");

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.createWeatherCache = async (req, res) => {
	try {
		const entry = await Weather.create(req.body);

		res.status(201).json(entry);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getCurrentWeather = async (req, res) => {
	try {
		const location = req.query.location;

		const entry = await Weather.findOne({
			location
		}).sort({ fetchedAt: -1 });

		res.json(entry);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getForecast = async (req, res) => {
	try {
		const location = req.query.location;

		const entry = await Weather.findOne({
			location
		}).sort({ fetchedAt: -1 });

		res.json(entry ? entry.forecast : []);
	} catch (error) {
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
