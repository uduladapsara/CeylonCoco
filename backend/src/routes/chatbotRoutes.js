const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
);

const { validate } = require(
	"../middleware/validationMiddleware"
);

const {
	askValidation
} = require(
	"../validators/chatbotValidator"
);

const {
	askQuestion,
	getChatHistory
} = require(
	"../controllers/chatbotController"
);

router.post(
	"/ask",
	protect,
	validate(askValidation),
	askQuestion
);

router.get(
	"/history",
	protect,
	getChatHistory
);

module.exports = router;
