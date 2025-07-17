import { Schema, model } from "mongoose";

const HealthCareLocationsSchema = new Schema({
  name: { type: String, required: true },
  latitude: { type: String, required: true }, // e.g., "37.7749"
  longitude: { type: String, required: true }, // e.g., "-122.4194"
  contactInfo: [{ type: String }], // e.g., ["123-456-7890", "
});

const HealthCareLocations = model(
  "HealthCareLocations",
  HealthCareLocationsSchema
);
export default HealthCareLocations;
