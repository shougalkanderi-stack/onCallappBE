import { Router } from "express";
import { register } from "../controllers/AuthController";
import { login } from "../controllers/AuthController";
import Patients from "../models/Patients";
import { authorize } from "../middleWares/AuthMiddleWare";
import { getPatientProfile } from "../controllers/PatientController";

const router = Router();

// /**
//  * @route   POST /auth/register
//  * @desc    Register a new user
//  * @access  Public
//  * @body    { name, email, phone, civilID, password }
//  */
router.post("/register", register);
router.post("/login", login);
router.get("/me", authorize, getPatientProfile);
//   async (req, res) => {
//   try {
//     const patientId = req.patient?.id;

//     if (!patientId) {
//       res.status(401).json({ message: "Unauthorized" });
//     } else {
//       const user = await Patients.findById(patientId);

//       if (!user) {
//         res.status(404).json({ message: "User not found" });
//       } else {
//         res.status(200).json(user);
//       }
//     }
//   } catch (err) {
//     console.error("Get profile error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

export default router;
