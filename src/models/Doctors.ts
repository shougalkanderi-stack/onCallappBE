import { model, Schema } from "mongoose";
import Appointment from "./Appointments";

const DoctorSchema = new Schema(
  {
    appointment: {
      ref: "Appointments",
      type: Schema.Types.ObjectId,
      required: true,
    },
    speciality: { type: String, required: true }, // cardiology, neurology, etc.
    companyName: { type: String, required: true }, // hospital or clinic name
    isOnCall: { type: Boolean },
    perscription: { ref: "Prescription", type: Schema.Types.ObjectId }, // icebox
    role: {
      type: [String],
      default: ["doctor", "healthCareProvider"],
    },
  },
  { timestamps: true }
);
const Doctor = model("Doctor", DoctorSchema);
export default Doctor;
