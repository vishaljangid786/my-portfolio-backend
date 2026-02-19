import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectsController.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", upload.single("image"), createProject);
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

export default router;
