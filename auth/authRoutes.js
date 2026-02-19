import express from "express";
import { login, logout, verifyToken } from "./authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;
