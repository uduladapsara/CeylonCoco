const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.createProduct = async (req, res) => {
	try {
		const product = await Product.create({
			...req.body,
			createdBy: req.user?._id
		});

		res.status(201).json(product);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getProducts = async (req, res) => {
	try {
		const { search, category } = req.query;
		const filter = {};

		if (category) {
			filter.category = category;
		}

		if (search) {
			filter.name = { $regex: search, $options: "i" };
		}

		const products = await Product.find(filter);

		res.json(products);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getProductById = async (req, res) => {
	try {
		const product = await Product.findById(
			req.params.id
		);

		if (!product) {
			return res.status(404).json({
				message: "Product not found"
			});
		}

		res.json(product);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const product = await Product.findById(
			req.params.id
		);

		if (!product) {
			return res.status(404).json({
				message: "Product not found"
			});
		}

		Object.assign(product, req.body);

		const updated = await product.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(
			req.params.id
		);

		if (!product) {
			return res.status(404).json({
				message: "Product not found"
			});
		}

		await product.deleteOne();

		res.json({
			message: "Product deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.createOrder = async (req, res) => {
	try {
		const order = await Order.create(req.body);

		res.status(201).json(order);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getOrders = async (req, res) => {
	try {
		const filter = {};

		if (req.query.customerId) {
			filter.customer = req.query.customerId;
		}

		if (req.query.status) {
			filter.status = req.query.status;
		}

		const orders = await Order.find(filter);

		res.json(orders);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(
			req.params.id
		);

		if (!order) {
			return res.status(404).json({
				message: "Order not found"
			});
		}

		res.json(order);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateOrder = async (req, res) => {
	try {
		const order = await Order.findById(
			req.params.id
		);

		if (!order) {
			return res.status(404).json({
				message: "Order not found"
			});
		}

		Object.assign(order, req.body);

		const updated = await order.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteOrder = async (req, res) => {
	try {
		const order = await Order.findById(
			req.params.id
		);

		if (!order) {
			return res.status(404).json({
				message: "Order not found"
			});
		}

		await order.deleteOne();

		res.json({
			message: "Order deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getCart = async (req, res) => {
	try {
		const customerId = req.query.customerId;

		const cart = await Cart.findOne({
			customer: customerId
		});

		res.json(cart || { customer: customerId, items: [] });
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateCart = async (req, res) => {
	try {
		const { customerId, items } = req.body;

		const cart = await Cart.findOneAndUpdate(
			{ customer: customerId },
			{ items },
			{ new: true, upsert: true }
		);

		res.json(cart);
	} catch (error) {
		handleError(res, error);
	}
};

exports.checkoutCart = async (req, res) => {
	try {
		const { customerId, shippingAddress } = req.body;

		const cart = await Cart.findOne({
			customer: customerId
		});

		if (!cart || cart.items.length === 0) {
			return res.status(400).json({
				message: "Cart is empty"
			});
		}

		const itemsWithPrice = await Promise.all(
			cart.items.map(async (item) => {
				const product = await Product.findById(
					item.product
				);

				return {
					product: item.product,
					quantity: item.quantity,
					price: product ? product.price : 0
				};
			})
		);

		const totalAmount = itemsWithPrice.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);

		const order = await Order.create({
			customer: customerId,
			items: itemsWithPrice,
			totalAmount,
			status: "Pending",
			shippingAddress
		});

		cart.items = [];
		await cart.save();

		res.status(201).json(order);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getSalesReport = async (req, res) => {
	try {
		const report = await Order.aggregate([
			{
				$group: {
					_id: "$status",
					totalOrders: { $sum: 1 },
					totalRevenue: { $sum: "$totalAmount" }
				}
			},
			{
				$project: {
					_id: 0,
					status: "$_id",
					totalOrders: 1,
					totalRevenue: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getBestSellingReport = async (
	req,
	res
) => {
	try {
		const report = await Order.aggregate([
			{ $unwind: "$items" },
			{
				$group: {
					_id: "$items.product",
					totalSold: { $sum: "$items.quantity" }
				}
			},
			{ $sort: { totalSold: -1 } },
			{ $limit: 10 },
			{
				$project: {
					_id: 0,
					product: "$_id",
					totalSold: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getCustomerReport = async (req, res) => {
	try {
		const report = await Order.aggregate([
			{
				$group: {
					_id: "$customer",
					orders: { $sum: 1 },
					totalSpent: { $sum: "$totalAmount" }
				}
			},
			{
				$project: {
					_id: 0,
					customer: "$_id",
					orders: 1,
					totalSpent: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};
