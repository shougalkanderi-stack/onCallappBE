import { Schema, model, Types, Document } from "mongoose";
import autopopulate from "mongoose-autopopulate";

export interface ILab extends Document {
  bookings: Types.ObjectId[];
  specialization: string;
  companyName: string;
  typesOfTests?: string[];
  medicalReports: Types.ObjectId[];
  provider: Types.ObjectId;
}

const labSchema = new Schema<ILab>(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider",
      required: true,
      autopopulate: true,  // 👈 Auto-populate the provider when querying
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    typesOfTests: [
      {
        type: String,
        trim: true,
      },
    ],
    medicalReports: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalReport",
      },
    ],
  },
  { timestamps: true }
);

labSchema.plugin(autopopulate);

export default model<ILab>("Lab", labSchema);
