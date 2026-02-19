import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllMain,
  getMainById,
  createMain,
  updateMain,
  deleteMain,
} from "../controllers/mainController.js";

const router = express.Router();

router.get("/", getAllMain);
router.get("/:id", getMainById);
router.post("/", upload.single("logo"), createMain);
router.put("/:id", upload.single("logo"), updateMain);
router.delete("/:id", deleteMain);

export default router;
