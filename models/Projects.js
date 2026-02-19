import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    githublink: {
      type: String,
      required: true,
    },
    livelink: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      maxLength: 3,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Projects", projectsSchema);
