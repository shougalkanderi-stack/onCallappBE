import { model, Schema } from "mongoose";

const nurseSchema = new Schema(
  {
    bookings: [{ ref: "Bookings", type: Schema.Types.ObjectId }],
    specialization: { type: String, required: true }, // e.g., ICU, Pediatrics
    companyName: { ref: "HealthLocations", type: Schema.Types.ObjectId }, // reference to HealthLocations model
    role: {
      type: [String],
      default: ["nurse", "healthCareProvider"],
    },
  },
  { timestamps: true }
);

const Nurse = model("Nurse", nurseSchema);
export default Nurse;
