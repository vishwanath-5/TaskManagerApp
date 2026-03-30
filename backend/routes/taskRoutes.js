const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
//Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    // console.log("ERROR : ", err);
    res.status(500).json({ error: err.message });
  }
});
//Add task
router.post("/", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const saved = await newTask.save();
    res.json(saved);
  } catch (err) {
    // console.log("ERROR: ", err);
    res.status(500).json({ error: err.message });
  }
});
// Mark
router.put("/:id", async (req, res) => {
  try {
    // console.log("Body: ", req.body);
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        completed: req.body.completed,
      },
      { new: true },
    );
    res.json(updateTask);
  } catch (err) {
    // console.log("Error : ", err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
