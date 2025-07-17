import { Schema, model, Document, Types } from "mongoose";

export interface IHealthCareProvider extends Document {
  _id: Types.ObjectId;
  name: string;
  age?: number;
  gender?: "Male" | "Female";
  email?: string;
  civilID: string;
  phoneNum: string;
  password: string;
  YOEX: number;
  image?: string;
  licenseNum: string;
  bio?: string;
  specialization: string;
  patient?: Types.ObjectId[];
  appointments?: Types.ObjectId[];
  // ratings?: number[];
  // averageRating?: number;
  // ratingCount?: number;
  block?: string;
  street?: string;
  building?: string;
  area?: string;
  doctor?: Types.ObjectId;
  nurse?: Types.ObjectId;
  labs?: Types.ObjectId;
  physiotherapist?: Types.ObjectId;
  avalSchedule?: Types.ObjectId[];
  prescriptions?: Types.ObjectId[];
  onCall?: boolean;

  role: "Doctor" | "Nurse" | "Physiotherapist" | "Lab";

  addRating(newRating: number): Promise<IHealthCareProvider>;
}

const healthCareProviderSchema = new Schema<IHealthCareProvider>(
  {
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female"] },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    civilID: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{12}$/, "CivilID must be exactly 12 digits"],
    },
    phoneNum: {
      type: String,
      required: true,
      match: [/^\d{8}$/, "Phone number must be exactly 8 digits"],
    },
    password: { type: String, required: true },
    YOEX: { type: Number, required: true },
    image: { type: String },
    licenseNum: { type: String, required: true },
    bio: { type: String },
    specialization: { type: String, required: true },

    patient: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],

    // ratings: [{
    //   type: Number,
    //   min: 1,
    //   max: 5,
    // }],

    // averageRating: {
    //   type: Number,
    //   min: 0,         
    //   max: 5,
    //   default: 0,
    // },

    // ratingCount: {
    //   type: Number,
    //   default: 0,
    // },

    block: { type: String },
    street: { type: String },
    building: { type: String },
    area: { type: String },

    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    nurse: { type: Schema.Types.ObjectId, ref: "Nurse" },
    physiotherapist: { type: Schema.Types.ObjectId, ref: "Physiotherapist" },
    labs: { type: Schema.Types.ObjectId, ref: "Lab" },
    avalSchedule: [{ type: Schema.Types.ObjectId, ref: "avalSchedule" }],
    prescriptions: [{ type: Schema.Types.ObjectId, ref: "Prescription" }],

    onCall: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["Doctor", "Nurse", "Physiotherapist", "Lab"],
      required: true,
    },
  },
  { timestamps: true }
);

// healthCareProviderSchema.methods.addRating = function (
//   newRating: number
// ): Promise<IHealthCareProvider> {
//   if (newRating < 1 || newRating > 5) {
//     throw new Error("Rating must be between 1 and 5.");
//   }

//   this.ratings.push(newRating);
//   this.ratingCount = this.ratings.length;

//   const sum = this.ratings.reduce((acc: number, curr: number) => acc + curr, 0);
//   this.averageRating = sum / this.ratingCount;

//   return this.save();
// };

export default model<IHealthCareProvider>(
  "HealthCareProvider",
  healthCareProviderSchema
);