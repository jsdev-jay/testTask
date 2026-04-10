import Task from "../model/task.schema.js";
import mongoose from "mongoose";

// create task
export const createTask = async (req, res) => {
  try {
    const { projectId, title, description, status, assignedTo, priority } =
      req.body;
    if (!projectId) {
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: "Invalid Project ID" });
      }
      return res.status(400).json({ message: "Project ID is required" });
    }
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    if (!assignedTo) {
      if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
        return res.status(400).json({ message: "Invalid Assigned To" });
      }
      return res.status(400).json({ message: "Assigned To is required" });
    }
    if (!priority) {
      return res.status(400).json({ message: "Priority is required" });
    }
    const newTask = new Task({
      projectId,
      title,
      description,
      status,
      assignedTo,
      priority,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created", task: newTask });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// get all task
export const getAllTask = async (req, res) => {
  try {
    const { status, priority, assignedTo } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter);
    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json({
      message: "Tasks fetched successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

// get task by id
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({ message: "Task fetched", task });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted", task });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
