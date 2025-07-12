import { time } from "console";
import { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    pateint: { ref: "Patient", type: Schema.Types.ObjectId, required: true },
    serviceProvider: {
      ref: "HealthCareProvider",
      type: Schema.Types.ObjectId,
      required: true,
    },
    // availability: { type: Boolean }, i think this is not needed, we can check if the service provider is available or not in their model
    status: { type: String }, // upcoming, pending, done, cancelled
    avgRate: { type: Number },
    date: { type: Date, required: true },
    time: { type: Number, required: true }, // 10:00 AM
  },
  { timestamps: true }
);
const Bookings = model("Bookings", bookingSchema);
export default Bookings;
