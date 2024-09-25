import express from "express";
import { ResumeController } from "./resume.controller.js";
import { ResumeService } from "./resume.service.js";
import { prisma } from "../configs/prisma-client.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";

const resumeService = new ResumeService(prisma);
const resumeController = new ResumeController(resumeService);

const resumeRouter = express.Router();

// 이력서 생성
resumeRouter.post("/", authenticateMiddleware, resumeController.createResume);

// 이력서 목록 조회
resumeRouter.get("/", authenticateMiddleware, resumeController.getResumes);

// 이력서 상세 조회
resumeRouter.get("/:id", authenticateMiddleware, resumeController.getResumeById);

// 이력서 수정
resumeRouter.patch("/:id", authenticateMiddleware, resumeController.updateResume);

// 이력서 삭제
resumeRouter.delete("/:id", authenticateMiddleware, resumeController.deleteResume);

// 이력서 상태 변경
resumeRouter.patch(
	"/:id/status",
	authenticateMiddleware,
	authorizationMiddleware(["RECRUITER"]),
	resumeController.updateResumeStatus
);

// 이력서 상태 변경 로그 조회
resumeRouter.get(
	"/:id/logs",
	authenticateMiddleware,
	authorizationMiddleware(["RECRUITER"]),
	resumeController.getResumeStatusLogs
);

export { resumeRouter };
