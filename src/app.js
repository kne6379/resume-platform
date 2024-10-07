import express from "express";
import "dotenv/config";
import { apiRouter } from "./router.js";
import expressSession from "express-session";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { sessionConfig } from "./configs/session.config.js";
import { redisStore } from "./configs/redis.config.js";
import { morganMiddleware } from "./middlewares/morgan.middleware.js";
import { logger } from "./configs/logger.config.js";

const app = express(); // express 생성
const SERVER_PORT = process.env.SERVER_PORT; // 환경 변수에서 포트 번호 가져오기

/// json, url 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 세션 설정 (Redis 세션 저장소를 사용)
app.use(expressSession({ ...sessionConfig, store: redisStore }));

// Health Check
app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

// morgan 미들웨어, http 요청 로그 관리
app.use(morganMiddleware);

// API 라우터 연결
app.use("/", apiRouter);

// 에러 미들웨어, 에러 발생 시 error 레벨의 로그 기록 및 처리
app.use(errorMiddleware);

// 서버 시작, info 레벨의 로거를 사용하여 서버가 언제, 몇 번 포트로 시작되었는지 기록
app.listen(SERVER_PORT, () => {
  logger.info(`${SERVER_PORT} 포트에서 서버가 실행되었습니다.`);
});
