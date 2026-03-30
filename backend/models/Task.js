const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Task", taskSchema);
