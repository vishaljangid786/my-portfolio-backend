import mongoose from "mongoose";

const experienceOverviewSchema = new mongoose.Schema(
  {
    yearOfExperience: {
      type: Number,
      required: true,
    },
    SatisfiedClient: {
      type: Number,
      required: true,
    },
    completedProjects: {
      type: Number,
      required: true,
    },
    ClientRetentionRate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ExperienceOverview", experienceOverviewSchema);
