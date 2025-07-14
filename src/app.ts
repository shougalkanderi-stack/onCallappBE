import express from "express";
import notFound from "./middlewares/notFound";
import ErrorHandler from "./middlewares/errorHandler";
import morgan from "morgan";
import cors from "cors";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import bookingsRoutes from "./routes/bookingsRoutes";
import availabilityRoutes from "./routes/availablityRoutes";
import path from "path";

const app = express();
const PORT = 8000;
// all middlewares are places before routes
app.use(express.json());
app.use(morgan("dev")); // Logging middleware
app.use(cors()); // middleware allows cross-origin requests

// Routes
app.use("/appointments", appointmentsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/availability", availabilityRoutes);

//error handling Middlewares
app.use(notFound);
app.use(ErrorHandler);

export default app;
