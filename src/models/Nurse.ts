// src/models/Nurse.ts

import { Schema, model, Types, Document } from "mongoose";
import autopopulate from "mongoose-autopopulate";

export interface INurse extends Document {
  provider: Types.ObjectId;
  bookings: Types.ObjectId[];
  specialization: string;
  companyName: string;
  languages?: string[];
  role?: string[];
}

const nurseSchema = new Schema<INurse>(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider",
      required: true,
      autopopulate: true,
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
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    role: {
      type: [String],
      default: ["nurse", "healthCareProvider"],
    },
  },
  { timestamps: true }
);

nurseSchema.plugin(autopopulate);

export default model<INurse>("Nurse", nurseSchema);
