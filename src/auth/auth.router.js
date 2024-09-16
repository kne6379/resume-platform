import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { prisma } from "../configs/prismaClient.js";

const authService = new AuthService(prisma);
const authController = new AuthController(authService);

const authRouter = express.Router();

authRouter.use("/", authController);

export { authRouter };
