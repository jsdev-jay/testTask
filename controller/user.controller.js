import User from "../model/user.schema.js";
import mongoose from "mongoose";
// create
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!role) {
      return res.status(400).json({ message: "Role is  required" });
    }
    if (!email) {
      res.status(400).json({ message: "Email is required" });
    }
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with same email has created",
      });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json({ username, email, role });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// get all user
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({ message: "User fetched", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched", user });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required " });
    }

    if (email) {
      const existing = await User.findOne({
        email,
        _id: { $ne: req.params.id },
      });

      if (existing) {
        return res.status(400).json({
          message: "User with same email has created",
        });
      }
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      new: true,
      name,
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }

    res.status(200).json({ name, email });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// delete
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted", user });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
