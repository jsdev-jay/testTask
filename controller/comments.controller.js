import Task from "../model/task.schema.js";
import User from "../model/user.schema.js";
import Comment from "../model/comments.schema.js";
import mongoose from "mongoose";

// create

export const createComment = async (req, res) => {
  try {
    const { taskId, userId } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid taskId",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    const [task, user] = await Promise.all([
      Task.findById(taskId),
      User.findById(userId),
    ]);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingComment = await Comment.findOne({
      userId,
    });
    if (existingComment) {
      return res.status(400).json({
        message: "User already commented",
      });
    }

    const newComment = await Comment.create({
      taskId,
      userId,
      comment,
    });

    res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
// get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({ message: "Comments fetched", comments });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

// update comment
export const updateComment = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
      comment,
      new: true,
    });
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res
      .status(200)
      .json({ message: "Comment updated", comment: updatedComment });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted", comment });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
