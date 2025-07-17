import express from "express";
import {
  addFavorite,
  removeFavorite,
} from "../controllers/PatientFavoritesController";
import { authorize } from "../middleWares/AuthMiddleWare";
// import { authMiddleware } from "../middleWares/AuthMiddleWare";

const router = express.Router();

router.post("/patient/favorites", authorize, addFavorite);
router.delete("/patient/favorites/:providerId", authorize, removeFavorite);

export default router;
