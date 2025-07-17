// src/routes/logisticsRouter.ts
import express from "express";
import { createBookingRequest } from "../controllers/BookingController";
// import { authMiddleware } from "../middleWares/AuthMiddleWare";
const router = express.Router();

router.post("/", createBookingRequest);

export default router;
