import mongoose, { Schema, model, Types, Document } from "mongoose";

export interface IDependent extends Document {
  name: string;
  civilID: number;
  phoneNum: number;
  bloodType?: string;
  image?: string;
  gender?: string;
  createdAt?: number;
  birthday?: number;
  weight?: number;
  height?: number;
  History?: string[];
  initialCheckUp?: string[];
  careGiver?: Types.ObjectId;                // ref to Patient
  appointments?: Types.ObjectId[];          // ref to Appointments
  perscription?: Types.ObjectId[];          // ref to Prescription
}

const dependentSchema = new Schema<IDependent>(
  {
    name: { type: String, required: true },
    civilID: { type: Number, required: true },
    phoneNum: { type: Number, required: true },
    bloodType: { type: String },
    image: { type: String },
    gender: { type: String },
    createdAt: { type: Number, default: () => Date.now() },
    birthday: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    History: [{ type: String }],
    initialCheckUp: [{ type: String }],
    careGiver: { type: Schema.Types.ObjectId, ref: "Patient" },
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    perscription: [{ type: Schema.Types.ObjectId, ref: "Prescription" }]
  },
  { timestamps: true }
);

export default model<IDependent>("Dependent", dependentSchema);
