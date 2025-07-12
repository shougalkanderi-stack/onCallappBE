import { Model, Schema, SchemaType } from "mongoose";

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    civilID: { type: String, required: true, unique: true }, // unique will check for duplicates, could help with auth and error handling later
    phone: { type: String, required: true },
    bloodType: { type: String },
    image: { type: String },
    gender: { type: String },
    appointments: [{ ref: "Appointment", type: Schema.Types.ObjectId }],
    bookings: [{ ref: "Bookings", type: Schema.Types.ObjectId }],
    birthDay: { type: Date },
    weight: { type: Number },
    height: { type: Number },
    HistoryReports: { type: [String] },
    intialCheckup: { type: [String] },
    isCareGiver: { type: Boolean, default: false },
    dependencies: { ref: "Dependets", type: Schema.Types.ObjectId },
    fave: { ref: "HealthCareProvider", type: Schema.Types.ObjectId },
    address: {
      area: { type: String },
      block: { type: Number },
      street: { type: Number },
    },
  },
  { timestamps: true }
);

const Patient = new Model("Patient", patientSchema);
export default Patient;
