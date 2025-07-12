import { model, Schema } from "mongoose";

const physioSchema = new Schema(
  {
    bookings: [{ ref: "Bookings", type: Schema.Types.ObjectId }],
    specialization: { type: String, required: true }, // e.g., ICU, Pediatrics
    companyName: { ref: "HealthLocations", type: Schema.Types.ObjectId }, // reference to HealthLocations model
  },
  { timestamps: true }
);

const PhysioTherapist = model("PhysioTherapist", physioSchema);
export default PhysioTherapist;
