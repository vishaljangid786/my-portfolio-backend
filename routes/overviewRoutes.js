import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllOverviews,
  getOverviewById,
  createOverview,
  updateOverview,
  deleteOverview,
} from "../controllers/overviewController.js";

const router = express.Router();

router.get("/", getAllOverviews);
router.get("/:id", getOverviewById);
router.post("/", upload.single("logo"), createOverview);
router.put("/:id", upload.single("logo"), updateOverview);
router.delete("/:id", deleteOverview);

export default router;
