import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { prisma } from "../configs/prisma-client.js";
import { signUpValidator } from "../middlewares/validators/sign-up-validator.middleware.js";
import { signInValidator } from "../middlewares/validators/sign-in-validator.middleware.js";
import { logger } from "../configs/logger.config.js";

const authRouter = express.Router();
const authService = new AuthService(prisma);
const authController = new AuthController(authService);

authRouter.post("/sign-up", signUpValidator, authController.signUp);
authRouter.post("/sign-in", signInValidator, authController.signIn);

export { authRouter };
