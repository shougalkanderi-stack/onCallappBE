import express from "express";
import { authorize } from "../middlewares/authorized";
import {
  getAllBookings,
  getBookingsByPatientId,
  getBookingsByHealthCareProviderId,
  makeBookingWithNurse,
  makeBookingWithPhysio,
  makeBookingWithLabs,
  updateBookingDate,
  updateBookingTime,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookings.controller";

const router = express.Router();

// 1st. Read >> GET
// get all bookings for both patients and health care providers
router.get("/", getAllBookings);
// get bookings by patient ID
router.get("/AllPateintsBookings", authorize, getBookingsByPatientId);
// get bookings by health care provider ID
router.get(
  "/AllHealthCareProviderBookings",
  authorize,
  getBookingsByHealthCareProviderId
);
// 2nd. Create >> POST
// create a new booking with nurse
router.post(
  "/createBookingWithNurse/:serviceProviderID",
  authorize,
  makeBookingWithNurse
);
// create a new booking with physio therapist
router.post(
  "/createBookingWithPhysio/:serviceProviderID",
  authorize,
  makeBookingWithPhysio
);
// create a new booking with labs
router.post(
  "/createBookingWithLabs/:serviceProviderID",
  authorize,
  makeBookingWithLabs
);
// 3rd. Update >> PUT
// update a booking date, user is logged in
router.put("/updateBookingDate/:bookingID", authorize, updateBookingDate);
// update a booking time, user is logged in
router.put("/updateBookingTime/:bookingID", authorize, updateBookingTime);
// update a booking status, user is logged in
router.put("/updateBookingStatus/:bookingID", authorize, updateBookingStatus);
// 4th. Delete >> DELETE
// delete a booking by ID, user is logged in
router.delete("/deleteBooking/:bookingID", authorize, deleteBooking);

export default router;
