import mongoose, { Schema, Types, Document } from "mongoose";

export interface Patients extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  civilID: string;
  password: string;
  role?: string;
  dependents: Types.ObjectId[];
  profileImage?: string;
  documentPath?: string;
  medicalHistoryPath?: string;
  favorites?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PatientsSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    phone: { type: String, required: false },
    civilID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Patient" },
    dependents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dependent" }],
    profileImage: { type: String },
    documentPath: { type: String },
    medicalHistoryPath: { type: String },
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: "HealthCareProvider" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Patients>("Patient", PatientsSchema);
