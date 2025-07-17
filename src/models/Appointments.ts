import { model, Schema } from "mongoose";
// import autopopulate from "mongoose-autopopulate";

const appointmentSchema = new Schema(
  {
    patient: {
      ref: "Patient",
      type: Schema.Types.ObjectId,
      // autopopulate: { select: "name" },
    },
    doctor: {
      ref: "Doctor",
      type: Schema.Types.ObjectId,
      // autopopulate: { select: "speciality" }, // autopopulate health care provider details
    },
    type: { type: String, required: true }, // online, offline, emergency,
    status: { type: String }, // upcoming, pending, done, cancelled
    price: { type: Number }, //
    date: { type: Date, required: true },
    time: { type: Number, required: true }, // 10:00 AM
    duration: { type: Number, required: true }, // 15min, 30min, 60min
    AItranscript: { ref: "Transcript", type: Schema.Types.ObjectId }, // icebox
    notes: { type: [String] },
  },
  { timestamps: true }
);

// appointmentSchema.plugin(autopopulate);
const Appointment = model("Appointment", appointmentSchema);
export default Appointment;
