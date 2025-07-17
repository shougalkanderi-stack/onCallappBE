// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import Patients from "../models/Patients";

// // Middleware to protect routes for logged-in patients
// export const authMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith("Bearer ")) {
//     res.status(401).json({ message: "Authorization token missing" });
//     return;
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       id: string;
//     };

//     const patient = await Patients.findById(decoded.id).select("-password");

//     if (!patient) {
//       res.status(401).json({ message: "Patient not found" });
//     } else {
//       req.patient = patient;
//       next();
//     }
//   } catch (err) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// export function authorize(req: Request, res: Response, next: NextFunction) {
//   const header = req.headers.authorization;
//   console.log("Authorization Header:", header);

//   if (!header || !header.startsWith("Bearer ")) {
//     res.status(401).json({ message: "No token provided or bad format" });
//   } else {
//     const token = header.split(" ")[1];

//     try {
//       const payload = jwt.verify(token, process.env.JWT_SECRET as string);
//       (req as any).patient = payload; // attach decoded user payload
//       next();
//     } catch (err) {
//       console.error("JWT Verification Error:", err);
//       res.status(401).json({ message: "Invalid or expired token" });
//     }
//   }
// }
export function authorize(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "No token provided" });
    return; // <-- just return, no value
  }

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ message: "Invalid auth format" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = payload;
    next();
  } catch (err) {
    console.log("err message:", err);
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
}
