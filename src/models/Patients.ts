import mongoose, { Schema, Types } from "mongoose";
export interface Patient extends Document {
  name: string;
  email: string;
  phone: string;
  civilID: string;
  password: string;
  role?: string;
  dependents: Types.ObjectId[];
  profileImage?: string;
  documentPath?: string;
  favorites?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    civilID: { type: String, required: true, unique: true },
    dependents: [{ type: Schema.Types.ObjectId, ref: "Dependent" }],
    profileImage: { type: String },
    documentPath: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: "HealthCareProvider" }],
  },
  { timestamps: true }
);

export default mongoose.model<Patient>("Patient", PatientSchema);
