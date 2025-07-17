import { model, Schema, Document } from "mongoose";
import autopopulate from "mongoose-autopopulate";

export interface IAppointment extends Document {
  patient: string;
  doctor: string;
  type: string;
  status?: string;
  price?: number;
  date: Date;
  time: number;
  duration: number;
  AItranscript?: string;
  notes?: string[];
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      ref: "Patient",
      type: Schema.Types.ObjectId,
      // autopopulate: { select: "name" },
    },
    doctor: {
      ref: "Doctor",
      type: Schema.Types.ObjectId,
      // autopopulate: { select: "speciality" },
    },
    type: { type: String, required: true },
    status: { type: String },
    price: { type: Number },
    date: { type: Date, required: true },
    time: { type: Number, required: true },
    duration: { type: Number, required: true },
    AItranscript: { ref: "Transcript", type: Schema.Types.ObjectId },
    notes: { type: [String] },
  },
  { timestamps: true }
);

appointmentSchema.plugin(autopopulate);

const Appointment = model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
export { IAppointment };
