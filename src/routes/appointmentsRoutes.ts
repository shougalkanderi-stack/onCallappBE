import express from "express";
import { authorize, authorizeRole } from "../middlewares/authorized";
import {
  getAllAppointments,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  makeAppointment,
  updateDateAppointment,
  updateTimeAppointment,
  updateStatusAppointment,
  updateTypeAppointment,
  updatePriceAppointment,
  updateDurationAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";

const router = express.Router();
// 1st. Read >> GET
// get all appointments for both patients and doctors
router.get("/", getAllAppointments);
// get appointments by patient ID
router.get(
  "/AllPateintsApp",
  authorize,
  authorizeRole(["patient"]), // this is for role authorization
  getAppointmentsByPatientId
);
// get appointments by doctor ID
router.get(
  "/AllDoctorsApp",
  authorize,
  authorizeRole(["doctor"]),
  getAppointmentsByDoctorId
);
// 2nd. Create >> POST
// create a new appointment
router.post(
  "/createApp/:doctorID",
  authorize,
  authorizeRole(["patient"]),
  makeAppointment
);
// 3rd. Update >> PUT
// update an appointment time, user is logged in
router.put(
  "/updateAppTime/:appintmentID",
  authorize,
  authorizeRole(["patient"]),
  updateTimeAppointment
);
// update an appointment date, user is logged in
router.put(
  "/updateAppDate/:appintmentID",
  authorize,
  authorizeRole(["patient"]),
  updateDateAppointment
);
// update an appointment status, user is logged in
router.put(
  "/updateAppStatus/:appintmentID",
  authorize,
  updateStatusAppointment
);
// update an appointment type, user is logged in
router.put(
  "/updateAppType/:appintmentID",
  authorize,
  authorizeRole(["patient"]),
  updateTypeAppointment
);
// update an appointment price, user is logged in
router.put(
  "/updateAppPrice/:appintmentID",
  authorize,
  authorizeRole(["doctor"]),
  updatePriceAppointment
);
// update an appointment duration, user is logged in
router.put(
  "/updateAppDuration/:appintmentID",
  authorize,
  authorizeRole(["doctor"]),

  updateDurationAppointment
);
// 4th. Delete >> DELETE
// delete an appointment by ID, user is logged in
router.delete(
  "/deleteApp/:appintmentID",
  authorize,
  authorizeRole(["patient"]),
  deleteAppointment
);
export default router;
