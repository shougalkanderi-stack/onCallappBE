import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authorize(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  console.log(header);
  if (!header) {
    res.status(401).json({ message: "No token provided" });
  }

  const [scheme, token] = header?.split(" ") || [];
  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ message: "Invalid auth format" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string); // need to add a secret key in .env file, take it from the BE girls
    (req as any).user = payload;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
// this will check for a singular role not an array of roles
// export function authorizeRole(roles: string[]) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = (req as any).user;
//     if (!user || !roles.includes(user.role)) {
//       res.status(403).json({ message: "Forbidden: insufficient role" });
//     }
//     next();
//   };
// }

// this will check for an array of roles
export function authorizeRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const userRoles = Array.isArray(user.role) ? user.role : [user.role];
    if (!user || !roles.some((role) => userRoles.includes(role))) {
      res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
}
