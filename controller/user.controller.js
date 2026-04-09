import User from "../model/user.schema.js";
// create
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = new User(req.body);
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with same email has created",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }
    await newUser.save();
    res.status(201).json({ message: "User saved", user: newUser });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// get all user
export const getAllUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.find();
    res.status(200).json({ message: "User fetched", user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(req.params.id);
    res.status(200).json({ message: "User fetched", user });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(401).json({ message: "USER NOT FOUND" });
    }
    if (email) {
      const existing = await UserManagement.findOne({
        email,
        _id: { $ne: req.params.id },
      });

      if (existing) {
        return res.status(400).json({
          message: "User with same email has created",
        });
      }
      updateData.email = email;
    }
    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
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
