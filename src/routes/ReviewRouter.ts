import express from "express";
import { postReview } from "../controllers/ReviewController";
import { authorize } from "../middleWares/AuthMiddleWare";
// import { authMiddleware } from "../middleWares/AuthMiddleWare";

const router = express.Router();

router.post("/reviews", authorize, postReview);

export default router;
