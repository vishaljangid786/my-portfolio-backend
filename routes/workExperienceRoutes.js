import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllWorkExperience,
  getWorkExperienceById,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} from "../controllers/workExperienceController.js";

const router = express.Router();

router.get("/", getAllWorkExperience);
router.get("/:id", getWorkExperienceById);
router.post("/", upload.single("logo"), createWorkExperience);
router.put("/:id", upload.single("logo"), updateWorkExperience);
router.delete("/:id", deleteWorkExperience);

export default router;
