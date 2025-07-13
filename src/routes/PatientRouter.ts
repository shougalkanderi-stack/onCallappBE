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

const router = express.Router();

// 👤 Patient
router.get("/me", getPatientProfile);
router.put("/me", updatePatientProfile);
router.delete("/:id", deletePatient);

// 👨‍👩‍👧 Dependents
router.post("/dependents", addDependent);
router.get("/dependents", getDependents);
router.put("/dependents/:id", updateDependent);
router.delete("/dependents/:id", deleteDependent);

router.post(
  "/:id/upload-profile",
  uploadImage.single("profileImage"),
  uploadProfileImage
);
router.post("/:id/upload-document", uploadPDF.single("document"), uploadPDFDoc);

export default router;
