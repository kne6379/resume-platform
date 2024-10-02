import express from "express";
import "dotenv/config";
import { apiRouter } from "./router.js";
import expressSession from "express-session";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { sessionConfig } from "./configs/session.config.js";
import { loggingMiddleware } from "./middlewares/logger.middleware.js";

const app = express(); // express 생성
const SERVER_PORT = process.env.SERVER_PORT; // 환경 변수에서 포트 번호 가져오기

// json, url 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession(sessionConfig));

// Health Check
app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

app.use(loggingMiddleware);

app.use("/", apiRouter);
app.use(errorMiddleware);

// 서버 시작
app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT}포트에서 실행 됐습니다.`);
});
