const Vehicle = require("../models/Vehicle");
const Trip = require("../models/Trip");
const Delivery = require("../models/Delivery");

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.createVehicle = async (req, res) => {
	try {
		const vehicle = await Vehicle.create(
			req.body
		);

		res.status(201).json(vehicle);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getVehicles = async (req, res) => {
	try {
		const vehicles = await Vehicle.find();

		res.json(vehicles);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateVehicle = async (req, res) => {
	try {
		const vehicle = await Vehicle.findById(
			req.params.id
		);

		if (!vehicle) {
			return res.status(404).json({
				message: "Vehicle not found"
			});
		}

		Object.assign(vehicle, req.body);

		const updated = await vehicle.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteVehicle = async (req, res) => {
	try {
		const vehicle = await Vehicle.findById(
			req.params.id
		);

		if (!vehicle) {
			return res.status(404).json({
				message: "Vehicle not found"
			});
		}

		await vehicle.deleteOne();

		res.json({
			message: "Vehicle deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.createTrip = async (req, res) => {
	try {
		const trip = await Trip.create(req.body);

		res.status(201).json(trip);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getTrips = async (req, res) => {
	try {
		const trips = await Trip.find();

		res.json(trips);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateTrip = async (req, res) => {
	try {
		const trip = await Trip.findById(
			req.params.id
		);

		if (!trip) {
			return res.status(404).json({
				message: "Trip not found"
			});
		}

		Object.assign(trip, req.body);

		const updated = await trip.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteTrip = async (req, res) => {
	try {
		const trip = await Trip.findById(
			req.params.id
		);

		if (!trip) {
			return res.status(404).json({
				message: "Trip not found"
			});
		}

		await trip.deleteOne();

		res.json({
			message: "Trip deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.createDelivery = async (req, res) => {
	try {
		const delivery = await Delivery.create(
			req.body
		);

		res.status(201).json(delivery);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getDeliveries = async (req, res) => {
	try {
		const deliveries = await Delivery.find();

		res.json(deliveries);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateDelivery = async (req, res) => {
	try {
		const delivery = await Delivery.findById(
			req.params.id
		);

		if (!delivery) {
			return res.status(404).json({
				message: "Delivery not found"
			});
		}

		Object.assign(delivery, req.body);

		const updated = await delivery.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteDelivery = async (req, res) => {
	try {
		const delivery = await Delivery.findById(
			req.params.id
		);

		if (!delivery) {
			return res.status(404).json({
				message: "Delivery not found"
			});
		}

		await delivery.deleteOne();

		res.json({
			message: "Delivery deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getVehicleUsageReport = async (req, res) => {
	try {
		const report = await Trip.aggregate([
			{
				$group: {
					_id: "$vehicle",
					trips: { $sum: 1 },
					distanceKm: { $sum: "$distanceKm" }
				}
			},
			{
				$project: {
					_id: 0,
					vehicle: "$_id",
					trips: 1,
					distanceKm: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getFuelReport = async (req, res) => {
	try {
		const report = await Trip.aggregate([
			{
				$group: {
					_id: null,
					totalFuelCost: { $sum: "$fuelCost" }
				}
			}
		]);

		res.json({
			totalFuelCost: report[0]?.totalFuelCost || 0
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getDeliveryReport = async (req, res) => {
	try {
		const report = await Delivery.aggregate([
			{
				$group: {
					_id: "$status",
					count: { $sum: 1 }
				}
			},
			{
				$project: {
					_id: 0,
					status: "$_id",
					count: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};
