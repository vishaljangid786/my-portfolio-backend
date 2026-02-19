import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    issuedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
