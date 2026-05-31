const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
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
	getProducts
);

router.post(
	"/products",
	protect,
	createProduct
);

router.get(
	"/products/:id",
	getProductById
);

router.put(
	"/products/:id",
	protect,
	updateProduct
);

router.delete(
	"/products/:id",
	protect,
	deleteProduct
);

router.get(
	"/orders",
	protect,
	getOrders
);

router.post(
	"/orders",
	protect,
	createOrder
);

router.get(
	"/orders/:id",
	protect,
	getOrderById
);

router.put(
	"/orders/:id",
	protect,
	updateOrder
);

router.delete(
	"/orders/:id",
	protect,
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
	updateCart
);

router.post(
	"/cart/checkout",
	protect,
	checkoutCart
);

router.get(
	"/reports/sales",
	protect,
	getSalesReport
);

router.get(
	"/reports/best-selling",
	protect,
	getBestSellingReport
);

router.get(
	"/reports/customers",
	protect,
	getCustomerReport
);

module.exports = router;
