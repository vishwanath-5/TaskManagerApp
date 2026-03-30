const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// ✅ CORS FIRST (VERY IMPORTANT)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// ✅ Middleware
app.use(express.json());

// ✅ Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

const Task = require("./models/Task");

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Delete route
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB ERROR:", err);
  });
