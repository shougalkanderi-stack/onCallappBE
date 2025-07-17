import { Schema, model, Types, Document } from "mongoose";
import autopopulate from "mongoose-autopopulate";

export interface INurse extends Document {
  bookings: Types.ObjectId[];
  companyName: string;
  provider: Types.ObjectId;
  languages?: string[];
}

const nurseSchema = new Schema<INurse>(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider",
      required: true,
      autopopulate: true, // 👈 auto-populate provider details
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
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
  },
  { timestamps: true }
);

nurseSchema.plugin(autopopulate);

export default model<INurse>("Nurse", nurseSchema);
