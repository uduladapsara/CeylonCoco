const express =
  require("express");

const cors =
  require("cors");

const authRoutes =
  require("./routes/authRoutes");

const userRoutes =
  require("./routes/userRoutes");

const plantationRoutes =
  require("./routes/plantationRoutes");

const inventoryRoutes =
  require("./routes/inventoryRoutes");

const labourRoutes =
  require("./routes/labourRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const financeRoutes =
  require("./routes/financeRoutes");

const salesRoutes =
  require("./routes/salesRoutes");

const weatherRoutes =
  require("./routes/weatherRoutes");

const chatbotRoutes =
  require("./routes/chatbotRoutes");

const transportRoutes =
  require("./routes/transportRoutes");

const feedbackRoutes =
  require("./routes/feedbackRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get(
  "/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "COCOSMART API Running"
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/plantations",
  plantationRoutes
);

app.use(
  "/api/inventory",
  inventoryRoutes
);

app.use(
  "/api/labour",
  labourRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/finance",
  financeRoutes
);

app.use(
  "/api/sales",
  salesRoutes
);

app.use(
  "/api/weather",
  weatherRoutes
);

app.use(
  "/api/chatbot",
  chatbotRoutes
);

app.use(
  "/api/transport",
  transportRoutes
);

app.use(
  "/api/feedback",
  feedbackRoutes
);

module.exports = app;