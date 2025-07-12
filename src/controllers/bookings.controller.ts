import { Request, NextFunction, Response, Express } from "express";
import Doctor from "../models/Doctors";
import Pateint from "../models/Pateints";
import Booking from "../models/Bookings";
import HealthCareProvider from "../models/HealthCareProvider";
import PhysioTherapist from "../models/Physio";
import Labs from "../models/Labs";

// CRUD for bookings
// 1st. Read >> GET
// get all bookings for both patients and healthcare providers
const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await Booking.find()
      .populate("pateint")
      .populate("HealthCareProvider");
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
// get bookings by patient ID
const getBookingsByPatientId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
    const patientBookings = await Booking.find({ pateint: pateintID }).populate(
      "HealthCareProvider"
    );
    res.status(200).json(patientBookings);
  } catch (error) {
    next(error);
  }
};
// get bookings by health care provider ID
const getBookingsByHealthCareProviderId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { healthCareProviderId } = (req as any).user._id; // assuming user is the logged in health care provider
    const healthCareProviderBookings = await Booking.find({
      serviceProvider: healthCareProviderId,
    }).populate("pateint");
    res.status(200).json(healthCareProviderBookings);
  } catch (error) {
    next(error);
  }
};
// 2nd. Create >> POST
// create a new booking with nurse
const makeBookingWithNurse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, time } = req.body;
    const { serviceProviderID } = req.params; // user is the logged in health care provider
    const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
    const newBooking = await Booking.create({
      pateint: pateintID,
      serviceProvider: serviceProviderID,
      status: "Pending", // default status
      date,
      time,
    });
    const pateint = await Pateint.findByIdAndUpdate(pateintID, {
      $push: { bookings: newBooking._id },
    });
    const nurse = await Doctor.findByIdAndUpdate(serviceProviderID, {
      $push: { bookings: newBooking._id },
    });
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
// create a new booking with physio therapist
const makeBookingWithPhysio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, time } = req.body;
    const { serviceProviderID } = req.params; // user is the logged in health care provider
    const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
    const newBooking = await Booking.create({
      pateint: pateintID,
      serviceProvider: serviceProviderID,
      status: "Pending", // default status
      date,
      time,
    });
    const pateint = await Pateint.findByIdAndUpdate(pateintID, {
      $push: { bookings: newBooking._id },
    });
    const physioTherapist = await PhysioTherapist.findByIdAndUpdate(
      serviceProviderID,
      {
        $push: { bookings: newBooking._id },
      }
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
// create a new booking with Labs
const makeBookingWithLabs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, time, typesOfTests } = req.body; // should I push type of tests to the booking model? or labs model?
    const { serviceProviderID } = req.params; // user is the logged in health care provider
    const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
    const newBooking = await Booking.create({
      pateint: pateintID,
      serviceProvider: serviceProviderID,
      status: "Pending", // default status
      date,
      time,
    });
    const pateint = await Pateint.findByIdAndUpdate(pateintID, {
      $push: { bookings: newBooking._id },
    });
    const labs = await Labs.findByIdAndUpdate(serviceProviderID, {
      $push: { bookings: newBooking._id, typesOfTests: typesOfTests }, // is this correct?
    });
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
// 3rd. Update >> PUT
// update a booking date
const updateBookingDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.body;
    // const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
    const { bookingId } = req.params; // user is the logged in
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
      date: date,
    });
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};
// update a booking time
const updateBookingTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { time } = req.body;
    // const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
    const { bookingId } = req.params; // user is the logged in
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
      time: time,
    });
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};
// update a booking status
const updateBookingStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    // const { pateintID } = (req as any).user._id; // assuming user is the logged in patient
    const { bookingId } = req.params; // user is the logged in
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
      status: status,
    });
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};
// 4th. Delete >> DELETE
// delete a booking by ID, user is logged in
const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId } = req.params; // user is the logged in
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    res.status(200).json(deletedBooking);
  } catch (error) {
    next(error);
  }
};

export {
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
};
