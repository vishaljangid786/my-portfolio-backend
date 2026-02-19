import mongoose from "mongoose";

const mainSchema = new mongoose.Schema(
  {
    certificateDesc: {
      type: String,
      required: true,
    },
    feedbackDesc: {
      type: String,
      required: true,
    },
    projectDesc: {
      type: String,
      required: true,
    },
    skillsDesc: {
      type: String,
      required: true,
    },
    experienceDesc: {
      type: String,
      required: true,
    },
    overviewDesc: {
      type: String,
      required: true,
    },
    homeDesc: {
      subtitle: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      highlightedWords: {
        type: [String],
        required: true,
      },
      logo: {
        type: String,
        required: true,
      },
      threeLines: {
        type: [String],
        required: true,
        validate: {
          validator: function(v) {
            return v.length === 3;
          },
          message: 'threeLines must contain exactly 3 strings'
        }
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Main", mainSchema);
