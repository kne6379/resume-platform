import express from "express";
import { UserService } from "./user.service.js";
import { prisma } from "../configs/prisma-client.js";
import { UserController } from "./user.controller.js";
import { authenticateMiddleware } from "../auth/authenticate.middleware.js";

const userRouter = express.Router();
const userService = new UserService(prisma);
const userController = new UserController(userService);

userRouter.get("/me", authenticateMiddleware, userController.getMe);
userRouter.patch("/me", authenticateMiddleware, userController.updateMe);
userRouter.patch(
  "/me/password",
  authenticateMiddleware,
  userController.updatePassword
);

export { userRouter };
