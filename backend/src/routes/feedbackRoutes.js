const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
);

const {
	createFeedback,
	getFeedback,
	updateFeedback,
	deleteFeedback,
	getCustomerSatisfactionReport
} = require(
	"../controllers/feedbackController"
);

router.get(
	"/",
	protect,
	getFeedback
);

router.post(
	"/",
	protect,
	createFeedback
);

router.put(
	"/:id",
	protect,
	updateFeedback
);

router.delete(
	"/:id",
	protect,
	deleteFeedback
);

router.get(
	"/reports/satisfaction",
	protect,
	getCustomerSatisfactionReport
);

module.exports = router;
