import mongoose, { Schema, Document, Types } from "mongoose";
export interface IDependent extends Document {
  name: string;
  age: number;
  relationship: string;
  patient: mongoose.Types.ObjectId;
  hasActivePrescription?: boolean;
  hasActiveAppointment?: boolean;
}

const dependentSchema = new Schema<IDependent>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    relationship: { type: String, required: true },
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    hasActivePrescription: { type: Boolean, default: false },
    hasActiveAppointment: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IDependent>("Dependent", dependentSchema);
