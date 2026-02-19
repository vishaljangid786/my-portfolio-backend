import express from "express";
import {
  getAllExperienceOverview,
  getExperienceOverviewById,
  createExperienceOverview,
  updateExperienceOverview,
  deleteExperienceOverview,
} from "../controllers/experienceOverviewController.js";

const router = express.Router();

router.get("/", getAllExperienceOverview);
router.get("/:id", getExperienceOverviewById);
router.post("/", createExperienceOverview);
router.put("/:id", updateExperienceOverview);
router.delete("/:id", deleteExperienceOverview);

export default router;
