import express from "express";
import { UserService } from "./user.service.js";
import { prisma } from "../configs/prisma-client.js";
import { UserController } from "./user.controller.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { updatePasswordValidator } from "../middlewares/validators/update-password-validator.middleware.js";

const userRouter = express.Router();
const userService = new UserService(prisma);
const userController = new UserController(userService);

userRouter.get("/me", authenticateMiddleware, userController.getMe);
userRouter.patch("/me", authenticateMiddleware, userController.updateMe);
userRouter.patch("/me/password", authenticateMiddleware, updatePasswordValidator, userController.updatePassword);

export { userRouter };
