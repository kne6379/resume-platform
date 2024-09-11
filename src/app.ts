import express from "express";
import dotenv from "dotenv";

dotenv.config(); // .env 파일에 정의된 환경 변수 로드하기

const app = express(); // express 생성
const port = process.env.PORT; // 환경 변수에서 포트 번호 가져오기

// Health Check
app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

// 서버 시작
app.listen(port, () => {
  console.log(`${port}포트에서 실행 됐습니다.`);
});
