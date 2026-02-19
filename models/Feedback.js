import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
