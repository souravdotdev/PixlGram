import express from "express"
import { registerUserController } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", registerUserController);

