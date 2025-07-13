import express from "express";
import { postReview } from "../controllers/ReviewController";

const router = express.Router();

router.post("/reviews", postReview);

export default router;
