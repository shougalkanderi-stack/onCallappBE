// src/models/HealthCareProvider.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IHealthCareProvider extends Document {
  name: string;
  civilID: string;
  phoneNum: string;
  passwordHash: string;
  YOEX: number;
  licenseNum: string;
  specialization: string;
  averageRating: { type: Number; default: 0 };
  reviewCount: { type: Number; default: 0 };
}

const HealthCareProviderSchema = new Schema({
  name: { type: String, required: true },
  civilID: { type: String, required: true, unique: true },
  phoneNum: { type: String, required: true },
  passwordHash: { type: String, required: true },
  YOEX: { type: Number, required: true },
  licenseNum: { type: String, required: true },
  specialization: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
});

export default mongoose.model<IHealthCareProvider>(
  "HealthCareProvider",
  HealthCareProviderSchema
);
