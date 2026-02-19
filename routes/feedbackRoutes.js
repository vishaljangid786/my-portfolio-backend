import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/", getAllFeedback);
router.get("/:id", getFeedbackById);
router.post("/", upload.single("image"), createFeedback);
router.put("/:id", upload.single("image"), updateFeedback);
router.delete("/:id", deleteFeedback);

export default router;
