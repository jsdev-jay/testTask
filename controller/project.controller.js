import Project from "../model/project.schema.js";
import mongoose from "mongoose";

// create project
export const createProject = async (req, res) => {
  try {
    const { ownerId, name, title, description, developers } = req.body;
    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: "Invalid Owner ID" });
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!developers) {
      return res.status(400).json({ message: "Developers is required" });
    }
    const newProject = new Project({
      ownerId,
      name,
      title,
      description,
      developers,
    });

    await newProject.save();
    res.status(201).json({ message: "Project saved", project: newProject });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// get all project
export const getAllProject = async (req, res) => {
  try {
    const { ownerId } = req.query;

    let filter = {};

    if (ownerId) {
      filter.ownerId = ownerId;
    }

    const projects = await Project.find(filter);

    if (!projects.length) {
      return res.status(404).json({
        message: "No projects found",
      });
    }

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
// get project by id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project fetched", project });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// update project
export const updateProject = async (req, res) => {
  try {
    const { ownerId, name, title, description, developers } = req.body;
    if (req.params.id) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
    }
    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: "Invalid Owner ID" });
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!developers) {
      return res.status(400).json({ message: "Developers is required" });
    }
    const project = await Project.findByIdAndUpdate(req.params.id, {
      ownerId,
      name,
      title,
      description,
      developers,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project updated", project });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted", project });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
