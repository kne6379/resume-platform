import express from "express";
import { authRouter } from "./auth/auth.router.js";
import { userRouter } from "./users/user.router.js";
import { resumeRouter } from "./resumes/resume.router.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/resumes", resumeRouter);

export { apiRouter };
