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
	productIdParam,
	orderIdParam,
	createProductValidation,
	updateProductValidation,
	createOrderValidation,
	updateOrderValidation,
	cartValidation,
	checkoutValidation,
	productsQueryValidation
} = require(
	"../validators/salesValidator"
);

const {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	createOrder,
	getOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
	getCart,
	updateCart,
	checkoutCart,
	getSalesReport,
	getBestSellingReport,
	getCustomerReport
} = require(
	"../controllers/salesController"
);

router.get(
	"/products",
	validate(productsQueryValidation),
	getProducts
);

router.post(
	"/products",
	protect,
	roleMiddleware("Admin"),
	validate(createProductValidation),
	createProduct
);

router.get(
	"/products/:id",
	validate(productIdParam),
	getProductById
);

router.put(
	"/products/:id",
	protect,
	roleMiddleware("Admin"),
	validate([...productIdParam, ...updateProductValidation]),
	updateProduct
);

router.delete(
	"/products/:id",
	protect,
	roleMiddleware("Admin"),
	validate(productIdParam),
	deleteProduct
);

router.get(
	"/orders",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	getOrders
);

router.post(
	"/orders",
	protect,
	validate(createOrderValidation),
	createOrder
);

router.get(
	"/orders/:id",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	validate(orderIdParam),
	getOrderById
);

router.put(
	"/orders/:id",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	validate([...orderIdParam, ...updateOrderValidation]),
	updateOrder
);

router.delete(
	"/orders/:id",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	validate(orderIdParam),
	deleteOrder
);

router.get(
	"/cart",
	protect,
	getCart
);

router.put(
	"/cart",
	protect,
	validate(cartValidation),
	updateCart
);

router.post(
	"/cart/checkout",
	protect,
	validate(checkoutValidation),
	checkoutCart
);

router.get(
	"/reports/sales",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	getSalesReport
);

router.get(
	"/reports/best-selling",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	getBestSellingReport
);

router.get(
	"/reports/customers",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	getCustomerReport
);

module.exports = router;
