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
	feedbackIdParam,
	createFeedbackValidation,
	updateFeedbackValidation
} = require(
	"../validators/feedbackValidator"
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
	roleMiddleware("Admin"),
	getFeedback
);

router.post(
	"/",
	protect,
	validate(createFeedbackValidation),
	createFeedback
);

router.put(
	"/:id",
	protect,
	roleMiddleware("Admin"),
	validate([...feedbackIdParam, ...updateFeedbackValidation]),
	updateFeedback
);

router.delete(
	"/:id",
	protect,
	roleMiddleware("Admin"),
	validate(feedbackIdParam),
	deleteFeedback
);

router.get(
	"/reports/satisfaction",
	protect,
	roleMiddleware("Admin"),
	getCustomerSatisfactionReport
);

module.exports = router;
