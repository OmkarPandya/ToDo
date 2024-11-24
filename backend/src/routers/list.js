const router = require("express").Router();
const List = require("../models/list");

// Create a task
router.post("/addTask", async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required!",
      });
    }

    const list = new List({ title, description, isCompleted });
    await list.save();

    res.status(200).json({
      success: true,
      list,
      message: "Task created successfully :)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while saving the task!",
      error: error.message,
    });
    console.error("Error occurred while saving the task!", error);
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const list = await List.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching the tasks",
      error: error.message,
    });
    console.error("Error occurred while fetching the tasks", error);
  }
});

// Get task by ID
router.get("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }

    res.status(200).json({
      success: true,
      list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching the task!",
      error: error.message,
    });
    console.error("Error occurred while fetching the task!", error);
  }
});

// Update task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    const updatedTask = await List.findByIdAndUpdate(
      req.params.id,
      { title, description, isCompleted },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found for updating!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully ;)",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while updating the task!",
      error: error.message,
    });
    console.error("Error occurred while updating the task!", error);
  }
});

// Delete task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const deletedTask = await List.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: !!deletedTask,
      message: deletedTask
        ? "Task deleted successfully ;)"
        : "Task not found or already deleted :)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting the task!",
      error: error.message,
    });
    console.error("Error occurred while deleting the task!", error);
  }
});

module.exports = router;
