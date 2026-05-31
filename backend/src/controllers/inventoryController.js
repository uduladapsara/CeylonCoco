const Inventory = require("../models/Inventory");
const StockMovement = require(
	"../models/StockMovement"
);

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.createItem = async (req, res) => {
	try {
		const item = await Inventory.create({
			...req.body,
			createdBy: req.user?._id
		});

		if (item.quantity) {
			await StockMovement.create({
				inventory: item._id,
				type: "IN",
				quantity: item.quantity,
				reason: "Initial stock",
				performedBy: req.user?._id
			});
		}

		res.status(201).json(item);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getInventory = async (req, res) => {
	try {
		const items = await Inventory.find();

		res.json(items);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getItemById = async (req, res) => {
	try {
		const item = await Inventory.findById(
			req.params.id
		);

		if (!item) {
			return res.status(404).json({
				message: "Item not found"
			});
		}

		res.json(item);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateItem = async (req, res) => {
	try {
		const item = await Inventory.findById(
			req.params.id
		);

		if (!item) {
			return res.status(404).json({
				message: "Item not found"
			});
		}

		Object.assign(item, req.body);

		const updated = await item.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteItem = async (req, res) => {
	try {
		const item = await Inventory.findById(
			req.params.id
		);

		if (!item) {
			return res.status(404).json({
				message: "Item not found"
			});
		}

		await item.deleteOne();

		res.json({
			message: "Item deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.adjustQuantity = async (req, res) => {
	try {
		const { quantity, reason } = req.body;

		const item = await Inventory.findById(
			req.params.id
		);

		if (!item) {
			return res.status(404).json({
				message: "Item not found"
			});
		}

		item.quantity = Number(quantity);

		const updated = await item.save();

		await StockMovement.create({
			inventory: item._id,
			type: "ADJUST",
			quantity: Number(quantity),
			reason: reason || "Quantity adjusted",
			performedBy: req.user?._id
		});

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.scanQrCode = async (req, res) => {
	try {
		const { qrCode, delta, reason } = req.body;

		const item = await Inventory.findOne({
			qrCode
		});

		if (!item) {
			return res.status(404).json({
				message: "Item not found"
			});
		}

		const change = Number(delta) || 0;

		item.quantity = item.quantity + change;

		const updated = await item.save();

		if (change !== 0) {
			await StockMovement.create({
				inventory: item._id,
				type: change > 0 ? "IN" : "OUT",
				quantity: Math.abs(change),
				reason: reason || "QR scan update",
				performedBy: req.user?._id
			});
		}

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getStockMovements = async (req, res) => {
	try {
		const filter = {};

		if (req.query.inventoryId) {
			filter.inventory = req.query.inventoryId;
		}

		const movements = await StockMovement.find(
			filter
		).sort({ createdAt: -1 });

		res.json(movements);
	} catch (error) {
		handleError(res, error);
	}
};

exports.createStockMovement = async (req, res) => {
	try {
		const { inventoryId, type, quantity, reason } =
			req.body;

		const item = await Inventory.findById(
			inventoryId
		);

		if (!item) {
			return res.status(404).json({
				message: "Item not found"
			});
		}

		const delta = type === "OUT"
			? -Math.abs(Number(quantity))
			: Math.abs(Number(quantity));

		item.quantity = item.quantity + delta;

		await item.save();

		const movement = await StockMovement.create({
			inventory: item._id,
			type,
			quantity: Math.abs(Number(quantity)),
			reason: reason || "Stock movement",
			performedBy: req.user?._id
		});

		res.status(201).json(movement);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getInventorySummary = async (req, res) => {
	try {
		const summary = await Inventory.aggregate([
			{
				$group: {
					_id: "$category",
					totalItems: { $sum: 1 },
					totalQuantity: { $sum: "$quantity" }
				}
			},
			{
				$project: {
					_id: 0,
					category: "$_id",
					totalItems: 1,
					totalQuantity: 1
				}
			}
		]);

		res.json(summary);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getLowStockReport = async (req, res) => {
	try {
		const items = await Inventory.find({
			$expr: { $lte: ["$quantity", "$minThreshold"] }
		});

		res.json(items);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getWarehouseReport = async (req, res) => {
	try {
		const report = await Inventory.aggregate([
			{
				$group: {
					_id: "$location",
					totalItems: { $sum: 1 },
					totalQuantity: { $sum: "$quantity" }
				}
			},
			{
				$project: {
					_id: 0,
					location: "$_id",
					totalItems: 1,
					totalQuantity: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};
