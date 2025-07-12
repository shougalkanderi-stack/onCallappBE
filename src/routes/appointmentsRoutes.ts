import express from "express";
import { authorize } from "../middlewares/authorized";
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
router.get("/AllPateintsApp", authorize, getAppointmentsByPatientId);
// get appointments by doctor ID
router.get("/AllDoctorsApp", authorize, getAppointmentsByDoctorId);
// 2nd. Create >> POST
// create a new appointment
router.post("/createApp", authorize, makeAppointment);
// 3rd. Update >> PUT
// update an appointment time, user is logged in
router.put("/updateAppTime/:appintmentID", authorize, updateTimeAppointment);
// update an appointment date, user is logged in
router.put("/updateAppDate/:appintmentID", authorize, updateDateAppointment);
// update an appointment status, user is logged in
router.put(
  "/updateAppStatus/:appintmentID",
  authorize,
  updateStatusAppointment
);
// update an appointment type, user is logged in
router.put("/updateAppType/:appintmentID", authorize, updateTypeAppointment);
// update an appointment price, user is logged in
router.put("/updateAppPrice/:appintmentID", authorize, updatePriceAppointment);
// update an appointment duration, user is logged in
router.put(
  "/updateAppDuration/:appintmentID",
  authorize,
  updateDurationAppointment
);
// 4th. Delete >> DELETE
// delete an appointment by ID, user is logged in
router.delete("/deleteApp/:appintmentID", authorize, deleteAppointment);
export default router;
