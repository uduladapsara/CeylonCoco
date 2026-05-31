const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
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
	askQuestion
);

router.get(
	"/history",
	protect,
	getChatHistory
);

module.exports = router;
