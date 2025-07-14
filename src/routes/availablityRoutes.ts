import express from "express";
import { authorize, authorizeRole } from "../middlewares/authorized";
import {
  getAllAvailableSchedules,
  createAvailableSchedule,
  updateAvailableSchedule,
  updateAvailableTime,
  updateAvailableDate,
  updateAvailableSlotsNum,
  deleteAvailableSchedule,
} from "../controllers/availableSchedule.controller";

const router = express.Router();
// 1st. Read >> GET
// get all available schedules for all health care providers
router.get("/", getAllAvailableSchedules);
// 2nd. Create >> POST
// create a new available schedule for health care provider
router.post(
  "/createAvailableSchedule",
  authorize,
  authorizeRole(["healthCareProvider"]),
  createAvailableSchedule
);
// 3rd. Update >> PUT
// update an available schedule, health care provider is logged in
router.put(
  "/updateAvailableSchedule/:scheduleID",
  authorize,
  authorizeRole(["healthCareProvider"]),
  updateAvailableSchedule
);
// update an available schedule time, health care provider is logged in
router.put(
  "/updateAvailableTime/:scheduleID",
  authorize,
  authorizeRole(["healthCareProvider"]),
  updateAvailableTime
);
// update an available schedule date, health care provider is logged in
router.put(
  "/updateAvailableDate/:scheduleID",
  authorize,
  authorizeRole(["healthCareProvider"]),
  updateAvailableDate
);
// update an available schedule slots number, health care provider is logged in
router.put(
  "/updateAvailableSlotsNum/:scheduleID",
  authorize,
  authorizeRole(["healthCareProvider"]),
  updateAvailableSlotsNum
);
// 4th. Delete >> DELETE
// delete an available schedule by ID, health care provider is logged in
router.delete(
  "/deleteAvailableSchedule/:scheduleID",
  authorize,
  authorizeRole(["healthCareProvider"]),
  deleteAvailableSchedule
);
export default router;
