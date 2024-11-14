import { SESSION_SECRET } from "../constants/env.constants.js";

const sessionConfig = {
  secret: SESSION_SECRET, // 세션을 암호화하는 비밀 키를 설정
  saveUninitialized: false, // 세션이 초기화되지 않았을 때 세션을 저장할 지 설정
  resave: false, // 클라이언트의 요청이 올 때마다 세션을 새롭게 저장할 지 설정, 변경사항이 없어도 다시 저장
  cookie: {
    // 세션 쿠키 설정
    maxAge: 1000 * 60 * 60 * 24, // 쿠키의 만료 기간을 1일로 설정합니다.
  },
};

export { sessionConfig };
