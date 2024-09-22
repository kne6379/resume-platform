import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { prisma } from "../configs/prisma-client.js";

const authRouter = express.Router();
const authService = new AuthService(prisma);
const authController = new AuthController(authService);

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/sign-in", authController.signIn);

export { authRouter };
