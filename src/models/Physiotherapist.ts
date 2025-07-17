import { Schema, model, Types, Document } from "mongoose";
import autopopulate from "mongoose-autopopulate";

export interface IPhysiotherapist extends Document {
  bookings: Types.ObjectId[];
  companyName: string;
  provider: Types.ObjectId; 
}

const physiotherapistSchema = new Schema<IPhysiotherapist>(
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
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

physiotherapistSchema.plugin(autopopulate);

export default model<IPhysiotherapist>(
  "Physiotherapist",
  physiotherapistSchema
);
