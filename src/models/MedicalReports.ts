import { Schema, model } from "mongoose";

const MedicalReportsSchema = new Schema(
  {
    lab: { ref: "Labs", type: Schema.Types.ObjectId }, // reference to Labs model
    testName: { type: String, required: true }, // e.g., Blood Test, X-Ray
    price: { type: Number }, // not required can be incuded later
    reportURL: { type: String, required: true }, // URL to the report document
    AIanalysis: { ref: "AITool", type: Schema.Types.ObjectId }, // reference to AI tool for analysis
  },
  { timestamps: true }
);
