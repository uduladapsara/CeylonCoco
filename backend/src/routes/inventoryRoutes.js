const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
);

const {
	createItem,
	getInventory,
	getItemById,
	updateItem,
	deleteItem,
	adjustQuantity,
	scanQrCode,
	getStockMovements,
	createStockMovement,
	getInventorySummary,
	getLowStockReport,
	getWarehouseReport
} = require(
	"../controllers/inventoryController"
);

router.get(
	"/",
	protect,
	getInventory
);

router.post(
	"/",
	protect,
	createItem
);

router.get(
	"/:id",
	protect,
	getItemById
);

router.put(
	"/:id",
	protect,
	updateItem
);

router.delete(
	"/:id",
	protect,
	deleteItem
);

router.put(
	"/:id/adjust",
	protect,
	adjustQuantity
);

router.post(
	"/scan",
	protect,
	scanQrCode
);

router.get(
	"/movements",
	protect,
	getStockMovements
);

router.post(
	"/movements",
	protect,
	createStockMovement
);

router.get(
	"/reports/summary",
	protect,
	getInventorySummary
);

router.get(
	"/reports/low-stock",
	protect,
	getLowStockReport
);

router.get(
	"/reports/warehouse",
	protect,
	getWarehouseReport
);

module.exports = router;
