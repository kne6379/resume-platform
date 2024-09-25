import express from "express";
import "dotenv/config";
import { apiRouter } from "./router.js";
import expressSession from "express-session";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express(); // express 생성
const SERVER_PORT = process.env.SERVER_PORT; // 환경 변수에서 포트 번호 가져오기

// json, url 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	expressSession({
		secret: process.env.SESSION_SECRET, // 세션을 암호화하는 비밀 키를 설정
		saveUninitialized: false, // 세션이 초기화되지 않았을 때 세션을 저장할 지 설정
		resave: false, // 클라이언트의 요청이 올 때마다 세션을 새롭게 저장할 지 설정, 변경사항이 없어도 다시 저장
		cookie: {
			// 세션 쿠키 설정
			maxAge: 1000 * 60 * 60 * 24, // 쿠키의 만료 기간을 1일로 설정합니다.
		},
	})
);

// Health Check
app.get("/health-check", (req, res) => {
	res.status(200).send("OK");
});

app.use("/", apiRouter);
app.use(errorMiddleware);

// 서버 시작
app.listen(SERVER_PORT, () => {
	console.log(`${SERVER_PORT}포트에서 실행 됐습니다.`);
});
