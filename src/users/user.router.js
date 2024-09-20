import express from "express";
import { UserService } from "./user.service.js";
import { prisma } from "../configs/prisma-client.js";
import { UserController } from "./user.controller.js";

const userRouter = express.Router();
const userService = new UserService(prisma);
const userController = new UserController(userService);

// userRouter.use("/", userController);

export { userRouter };
