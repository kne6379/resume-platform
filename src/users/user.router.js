import express from "express";
import { UserService } from "./user.service.js";
import { prisma } from "../configs/prismaClient.js";
import { UserController } from "./user.controller.js";

const userRouter = express.Router();
const userService = new UserService(prisma);
const userController = new UserController(userService);

userRouter.get("/me", userController.getMe);
userRouter.patch("/me", userController.updateMe);
userRouter.patch("/me/password", userController.updatePassword);

export { userRouter };