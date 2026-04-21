import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Project name is required"],
  },
  title: {
    type: String,
    required: [true, "Project title is required"],
    trim: true,
    maxlength: 100,
  },

  description: {
    type: String,
    default: "",
    trim: true,
    maxlength: 1000,
  },
  developers: [
    {
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["frontend", "backend"],
        default: "backend",
      },
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
