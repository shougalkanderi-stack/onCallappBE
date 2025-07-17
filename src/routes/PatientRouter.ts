import express from "express";
import {
  getPatientProfile,
  updatePatientProfile,
  deletePatient,
} from "../controllers/PatientController";
import {
  addDependent,
  getDependents,
  updateDependent,
  deleteDependent,
} from "../controllers/DependentController";
import { uploadImage, uploadPDF } from "../middleWares/Upload";
import {
  uploadProfileImage,
  uploadPDFDoc,
} from "../controllers/PatientController";
import { authorize } from "../middleWares/AuthMiddleWare";
// import { authMiddleware } from "../middleWares/AuthMiddleWare";
// import { authMiddleware } from "../middleWares/AuthMiddleWare"; // ✅ Import auth

const router = express.Router();

// 👤 Patient
router.get("/me", authorize, getPatientProfile);
router.put("/me", authorize, updatePatientProfile);
router.delete("/:id", deletePatient);

// 👨‍👩‍👧 Dependents
router.post("/dependents", authorize, addDependent);
router.get("/dependents", authorize, getDependents);
router.put("/dependents/:id", authorize, updateDependent);
router.delete("/dependents/:id", authorize, deleteDependent);

router.post(
  "/:id/upload-profile",
  uploadImage.single("profileImage"),
  uploadProfileImage
);
router.post("/:id/upload-document", uploadPDF.single("document"), uploadPDFDoc);

export default router;
