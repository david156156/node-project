const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.mongodb_Atlas)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Middleware
app.use(express.json());
app.use(morgan(":date[iso] :method :url :status :response-time ms"));
app.use(cors());

// Routes
app.use("/api/bcards/users", userRoutes);
app.use("/api/bcards/cards", cardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
