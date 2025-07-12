import { model, Schema } from "mongoose";
import { ref } from "process";

const labsSchema = new Schema(
  {
    bookings: [{ ref: "Bookings", type: Schema.Types.ObjectId }],
    specialization: { type: String, required: true }, // e.g., ICU, Pediatrics
    companyName: { ref: "HealthLocations", type: Schema.Types.ObjectId },
    typesOfTests: { type: [String], required: true }, // e.g., Blood Test, X-Ray
    medicalReports: { ref: "MedicalReports", type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const Labs = model("Labs", labsSchema);
export default Labs;
