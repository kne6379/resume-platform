import express from "express";
import { ResumeController } from "./resume.controller.js";
import { ResumeService } from "./resume.service.js";
import { prisma } from "../configs/prismaClient.js";

const resumeService = new ResumeService(prisma);
const resumeController = new ResumeController(resumeService);

const resumeRouter = express.Router();

resumeRouter.use("/", resumeController);

export { resumeRouter };
