import { model, Schema } from "mongoose";
// import autopopulate from "mongoose-autopopulate";

const appointmentSchema = new Schema(
  {
    patient: {
      ref: "Patient",
      type: Schema.Types.ObjectId,
      required: true,
      // autopopulate: { select: "name" },
    },
    doctor: {
      ref: "Doctor",
      type: Schema.Types.ObjectId,
      required: true,
      // autopopulate: { select: "speciality" },
    },
    type: { type: String, required: true }, // online, offline, emergency
    status: { type: String }, // upcoming, pending, done, cancelled
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: Number, required: true }, // could be hour or timestamp
    duration: { type: Number, required: true }, // in minutes: 15, 30, 60
    AItranscript: {
      ref: "Transcript",
      type: Schema.Types.ObjectId,
    }, // optional, future feature
    notes: { type: [String] },
  },
  { timestamps: true }
);

// appointmentSchema.plugin(autopopulate); // Enable if using autopopulate plugin

const Appointment = model("Appointment", appointmentSchema);
export default Appointment;
