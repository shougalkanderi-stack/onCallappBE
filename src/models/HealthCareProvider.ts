// src/models/HealthCareProvider.ts
import e from "express";
import mongoose, { model, Schema } from "mongoose";
import { ref } from "process";

const HealthCareProviderSchema = new Schema({
  name: { type: String, required: true },
  civilID: { type: String, required: true, unique: true },
  phoneNum: { type: String, required: true },
  passwordHash: { type: String, required: true },
  YOEX: { type: Number, required: true },
  licenseNum: { type: String, required: true },
  specialization: { type: String, required: true },
  doctor: { ref: "Doctor", type: Schema.Types.ObjectId }, // reference to Doctor model
  nurse: { ref: "Nurse", type: Schema.Types.ObjectId },
});

const HealthCareProvider = model(
  "HealthCareProvider",
  HealthCareProviderSchema
);
export default HealthCareProvider;
