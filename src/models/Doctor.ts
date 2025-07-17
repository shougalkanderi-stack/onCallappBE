import { Schema, model, Types, Document } from "mongoose";
import autopopulate from "mongoose-autopopulate";

// export interface IDoctor extends Document {
//   provider: Types.ObjectId;
//   appointments: Types.ObjectId[];
//   hospitalOrClinicName: string;
//   isOnCall?: boolean;
//   prescriptions?: Types.ObjectId[];
// }

const doctorSchema = new Schema(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider",
      required: true,
      autopopulate: true, 
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    hospitalOrClinicName: {
      type: String,
      required: true,
      trim: true,
    },
    isOnCall: {
      type: Boolean,
      default: false,
    },
    prescriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Prescription",
      },
    ],
  },
  { timestamps: true }
);

doctorSchema.plugin(autopopulate);

export default model("Doctor", doctorSchema);
