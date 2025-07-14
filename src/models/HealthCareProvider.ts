// src/models/HealthCareProvider.ts
import { timeStamp } from "console";
import e from "express";
import mongoose, { model, Schema } from "mongoose";
import { ref } from "process";

const HealthCareProviderSchema = new Schema(
  {
    name: { type: String, required: true },
    civilID: { type: String, required: true, unique: true },
    phoneNum: { type: String, required: true },
    passwordHash: { type: String, required: true },
    YOEX: { type: Number, required: true },
    licenseNum: { type: String, required: true },
    specialization: { type: String, required: true },
    doctor: { ref: "Doctor", type: Schema.Types.ObjectId }, // reference to Doctor model
    nurse: { ref: "Nurse", type: Schema.Types.ObjectId },
    physio: { ref: "Physio", type: Schema.Types.ObjectId }, // reference to Physio model
    lab: { ref: "Labs", type: Schema.Types.ObjectId }, // reference to Labs model
    bookings: [{ ref: "Bookings", type: Schema.Types.ObjectId }], // reference to Bookings model
    companyName: { ref: "HealthCareLocations", type: Schema.Types.ObjectId }, //  reference to HealthLocations model
    availableSchedule: [
      { ref: "AvailableSchedule", type: Schema.Types.ObjectId },
    ],
    languages: [{ type: String }],
    bio: { type: String },
    image: { type: String }, // URL to the provider's image
    createdAt: { type: Date, default: timeStamp },
  },
  { timestamps: true }
);

const HealthCareProvider = model(
  "HealthCareProvider",
  HealthCareProviderSchema
);
export default HealthCareProvider;
