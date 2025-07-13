import { Request, Response } from "express";
import BookingRequest from "../models/BookingRequest";
import { sendNotification } from "../utils/sendNotification";
import cron from "node-cron";
import moment from "moment";

export const createBookingRequest = async (req: Request, res: Response) => {
  try {
    const { type, preferredDateTime, location, notes, patientId } = req.body;

    // 🚨 DEBUG: Log input
    console.log("📥 Booking Input:", {
      type,
      preferredDateTime,
      location,
      notes,
      patientId,
    });

    // Basic validation
    if (!type || !preferredDateTime || !location) {
      res.status(422).json({ message: "Date and location are required" });
    } else {
      const validTypes = ["transport", "equipment", "nurse"];
      if (!validTypes.includes(type)) {
        res.status(400).json({ message: "Unsupported logistics request type" });
      } else {
        // 🚨 DEBUG: Creating booking request
        console.log("📦 Creating new booking request...");

        const newRequest = new BookingRequest({
          type,
          preferredDateTime,
          location,
          notes,
          patientId,
        });

        await newRequest.save();

        // 🚨 DEBUG: Booking saved
        console.log("✅ Booking saved:", newRequest);

        // ✅ Send confirmation notification
        try {
          await sendNotification(
            patientId,
            "Your booking has been confirmed.",
            "booking confirmation" // 🛠 Make sure the value is valid per your Notification model
          );
        } catch (notifError) {
          console.error("❌ Notification error:", notifError);
        }

        // ✅ Schedule reminder 1 hour before session
        const reminderTime = moment(preferredDateTime)
          .subtract(1, "hour")
          .toDate();

        console.log("⏰ Scheduling reminder for:", reminderTime);

        cron.schedule(
          `${reminderTime.getMinutes()} ${reminderTime.getHours()} ${reminderTime.getDate()} ${
            reminderTime.getMonth() + 1
          } *`,
          async () => {
            try {
              await sendNotification(
                patientId,
                "Reminder: Your Booking session is in 1 hour.",
                "reminder"
              );
            } catch (error) {
              console.error("Reminder job failed:", error);
            }
          }
        );

        res.status(201).json({
          message: "Booking request submitted successfully",
          request: newRequest,
        });
      }
    }
  } catch (error: any) {
    console.error("❌ Booking request error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
};
