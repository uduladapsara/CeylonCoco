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

module.exports = app;