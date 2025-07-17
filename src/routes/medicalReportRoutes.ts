// // router.post("/", authenticate, upload.single("reportFile"), uploadReport);
// // router.get("/", authenticate, getReports);
// // router.get("/:id", authenticate, getReportById);
// // router.put("/:id", authenticate, updateReport);
// // router.delete("/:id", authenticate, deleteReport);

import express from "express";
import { uploadReport, getReports, getReportById, updateReport, deleteReport } from "../controllers/medicalReportController";
import upload from "../middlewares/upload";
import authenticate from "../middlewares/authenticate"; // optional, recommended

const router = express.Router();

// Upload a new report
router.post("/", authenticate, upload.single("reportFile"), uploadReport);

// Get all reports
router.get("/", authenticate, getReports);

// Get single report by ID
router.get("/:id", authenticate, getReportById);

// Update report
router.put("/:id", authenticate, upload.single("reportFile"), updateReport);

// Delete report
router.delete("/:id", authenticate, deleteReport);

export default router;
