import { model, Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    pateint: { ref: "Patient", type: Schema.Types.ObjectId, required: true },
    doctor: { ref: "Doctor", type: Schema.Types.ObjectId, required: true },
    type: { type: String, required: true }, // online, offline, emergency,
    status: { type: String }, // upcoming, pending, done, cancelled
    price: { type: Number, required: true }, //
    date: { type: Date, required: true },
    time: { type: Number, required: true }, // 10:00 AM
    duration: { type: Number, required: true }, // 15min, 30min, 60min
    AItranscript: { ref: "Transcript", type: Schema.Types.ObjectId }, // icebox
    notes: { type: [String] },
  },
  { timestamps: true }
);
const Appointment = model("Appointment", appointmentSchema);
export default Appointment;
