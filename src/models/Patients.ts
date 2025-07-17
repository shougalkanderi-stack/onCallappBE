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
  favorites?: Types.ObjectId[];
  medicalHistoryPath?: string;
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
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: "HealthCareProvider" },
    ],
    medicalHistoryPath: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<Patients>("Patient", PatientsSchema);

//     import mongoose, { Document, Schema, Types } from "mongoose";

// export interface IAppointment extends Document {
//   patient: Types.ObjectId;               // ref to Patient
//   doctor: Types.ObjectId;                // ref to Doctor
//   type: "online" | "offline" | "emergency";
//   status: "upcoming" | "pending" | "done" | "cancelled";
//   price: number;
//   date: Date;
//   time: string;                    // or Date if stored as datetime
//   duration: 30 | 60;               // in minutes
//   altTranscript?: Types.ObjectId;  // ref to Transcript (optional)
//   notes?: string;
// }

// const appointmentSchema = new Schema<IAppointment>(
//   {
//     patient: {
//       type: Schema.Types.ObjectId,
//       ref: "Patient",
//       required: true,
//     },
//     doctor: {
//       type: Schema.Types.ObjectId,
//       ref: "HealthCareProvider",  // adjust to match your Doctor model collection name
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: ["online", "offline", "emergency"],
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["upcoming", "pending", "done", "cancelled"],
//       default: "pending",
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     time: {
//       type: String, // could also be Date or separate hour/minutes depending on frontend
//       required: true,
//     },
//     duration: {
//       type: Number,
//       enum: [15, 30, 60],
//       required: true,
//     },
//     altTranscript: {
//       type: Schema.Types.ObjectId,
//       ref: "Transcript",
//     },
//     notes: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IAppointment>("Appointment", appointmentSchema);
