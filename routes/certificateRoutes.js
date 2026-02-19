import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();

router.get("/", getAllCertificates);
router.get("/:id", getCertificateById);
router.post("/", upload.single("image"), createCertificate);
router.put("/:id", upload.single("image"), updateCertificate);
router.delete("/:id", deleteCertificate);

export default router;
