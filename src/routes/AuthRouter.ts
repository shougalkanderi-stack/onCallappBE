import { Router } from "express";
import { register } from "../controllers/AuthController";
import { login } from "../controllers/AuthController";

const router = Router();

// /**
//  * @route   POST /auth/register
//  * @desc    Register a new user
//  * @access  Public
//  * @body    { name, email, phone, civilID, password }
//  */
router.post("/register", register);
router.post("/login", login);

export default router;
