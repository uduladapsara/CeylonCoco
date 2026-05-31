const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
);

const roleMiddleware = require(
	"../middleware/roleMiddleware"
);

const { validate } = require(
	"../middleware/validationMiddleware"
);

const {
	inventoryIdParam,
	createItemValidation,
	adjustQuantityValidation,
	scanValidation,
	stockMovementValidation
} = require(
	"../validators/inventoryValidator"
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
	roleMiddleware(
		"Admin",
		"WarehouseStaff",
		"FinanceManager"
	),
	getInventory
);

router.post(
	"/",
	protect,
	roleMiddleware("Admin", "WarehouseStaff"),
	validate(createItemValidation),
	createItem
);

router.get(
	"/:id",
	protect,
	roleMiddleware(
		"Admin",
		"WarehouseStaff",
		"FinanceManager"
	),
	validate(inventoryIdParam),
	getItemById
);

router.put(
	"/:id",
	protect,
	roleMiddleware("Admin", "WarehouseStaff"),
	validate(inventoryIdParam),
	updateItem
);

router.delete(
	"/:id",
	protect,
	roleMiddleware("Admin", "WarehouseStaff"),
	validate(inventoryIdParam),
	deleteItem
);

router.put(
	"/:id/adjust",
	protect,
	roleMiddleware("Admin", "WarehouseStaff"),
	validate([...inventoryIdParam, ...adjustQuantityValidation]),
	adjustQuantity
);

router.post(
	"/scan",
	protect,
	roleMiddleware("Admin", "WarehouseStaff"),
	validate(scanValidation),
	scanQrCode
);

router.get(
	"/movements",
	protect,
	roleMiddleware(
		"Admin",
		"WarehouseStaff",
		"FinanceManager"
	),
	getStockMovements
);

router.post(
	"/movements",
	protect,
	roleMiddleware("Admin", "WarehouseStaff"),
	validate(stockMovementValidation),
	createStockMovement
);

router.get(
	"/reports/summary",
	protect,
	roleMiddleware(
		"Admin",
		"WarehouseStaff",
		"FinanceManager"
	),
	getInventorySummary
);

router.get(
	"/reports/low-stock",
	protect,
	roleMiddleware(
		"Admin",
		"WarehouseStaff",
		"FinanceManager"
	),
	getLowStockReport
);

router.get(
	"/reports/warehouse",
	protect,
	roleMiddleware(
		"Admin",
		"WarehouseStaff",
		"FinanceManager"
	),
	getWarehouseReport
);

module.exports = router;
