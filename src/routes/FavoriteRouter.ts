import express from "express";
import {
  addFavorite,
  removeFavorite,
} from "../controllers/PatientFavoritesController";

const router = express.Router();

router.post("/patient/favorites", addFavorite);
router.delete("/patient/favorites/:providerId", removeFavorite);

export default router;
