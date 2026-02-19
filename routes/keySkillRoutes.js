import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllKeySkills,
  getKeySkillById,
  createKeySkill,
  updateKeySkill,
  deleteKeySkill,
} from "../controllers/keySkillController.js";

const router = express.Router();

router.get("/", getAllKeySkills);
router.get("/:id", getKeySkillById);
router.post("/", upload.single("logo"), createKeySkill);
router.put("/:id", upload.single("logo"), updateKeySkill);
router.delete("/:id", deleteKeySkill);

export default router;
