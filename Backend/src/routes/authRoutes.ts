import express from "express"
import { registerUserController, verifyController } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", registerUserController);
authRouter.post("/verify", verifyController);