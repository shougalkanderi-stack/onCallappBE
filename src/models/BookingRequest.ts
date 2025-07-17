// src/models/LogisticsRequest.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBookingRequest extends Document {
  type: "transport" | "equipment" | "nurse";
  preferredDateTime: Date;
  location: string;
  notes?: string;
}

const bookingRequestSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["transport", "equipment", "nurse"],
      required: true,
    },
    preferredDateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const bookingRequest = mongoose.model<IBookingRequest>(
  "BookingRequest",
  bookingRequestSchema
);

export default bookingRequest;
