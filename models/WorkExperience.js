import mongoose from "mongoose";

const workExperienceSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    descriptions: {
      type: [String],
      maxLength: 4,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("WorkExperience", workExperienceSchema);
