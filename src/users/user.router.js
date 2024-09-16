import express from "express";
import { UserService } from "./user.service";
import { prisma } from "../configs/prismaClient";
import { UserController } from "./user.controller";

const userRouter = express.Router();

const userService = new UserService(prisma);
const userController = new UserController(userService);

userRouter.use("/", userController);

export { userRouter };
