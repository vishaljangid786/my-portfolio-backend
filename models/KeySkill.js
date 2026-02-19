import mongoose from "mongoose";

const keySkillSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("KeySkill", keySkillSchema);
