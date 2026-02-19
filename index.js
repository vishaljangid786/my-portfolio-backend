import dotenv from "dotenv";

// Load environment variables FIRST, before any other imports
dotenv.config();

import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db/db.js";
import authRoutes from "./auth/authRoutes.js";
import { verifyToken } from "./auth/authController.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import experienceOverviewRoutes from "./routes/experienceOverviewRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import keySkillRoutes from "./routes/keySkillRoutes.js";
import overviewRoutes from "./routes/overviewRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import workExperienceRoutes from "./routes/workExperienceRoutes.js";
import mainRoutes from "./routes/mainRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads, index.html)
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to database
connectDB();

// Auth routes (no protection)
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)
app.use('/api/certificates', verifyToken, certificateRoutes);
app.use('/api/experience-overview', verifyToken, experienceOverviewRoutes);
app.use('/api/feedback', verifyToken, feedbackRoutes);
app.use('/api/key-skills', verifyToken, keySkillRoutes);
app.use('/api/overview', verifyToken, overviewRoutes);
app.use('/api/projects', verifyToken, projectsRoutes);
app.use('/api/work-experience', verifyToken, workExperienceRoutes);
app.use('/api/main', verifyToken, mainRoutes);


app.use('/', (req, res) => {
    res.send('Portfolio Backend API - Running')
})

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
