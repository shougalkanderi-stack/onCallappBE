import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

// this will expose the .env file to my server
dotenv.config();

// connecting function to mongoDB
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("connected to mongoDB: onCall Full Stack");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
const PORT = 8000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
