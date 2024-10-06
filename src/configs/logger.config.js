import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { NODE_ENV } from "../constants/env.constants.js";

const { createLogger } = winston;
const { combine, printf, timestamp, colorize } = winston.format;

// 로그 저장 디렉토리 설정
const logDir = "logs";

const format = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(info => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`)
  //? format: combine() 에서 정의한 timestamp와 label 형식값이 logFormat에 들어가서 정의되게 된다. level이나 message는 콘솔에서 자동 정의
);

//* 실제 로그를 어떻게 기록을 한 것인가 정의
const transports = [
  //* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
  new winstonDaily({
    level: "info", // info 레벨에선
    datePattern: "YYYY-MM-DD", // 파일 날짜 형식
    dirname: logDir + "/info", // 파일 경로
    filename: `%DATE%.info.log`, // 파일 이름
    maxFiles: 30, // 최근 30일치 로그 파일을 남김
    zippedArchive: true,
  }),
  //* error 레벨 로그를 저장할 파일 설정 (info에 자동 포함되지만 일부러 따로 빼서 설정)
  new winstonDaily({
    level: "error", // error 레벨에선
    datePattern: "YYYY-MM-DD",
    dirname: logDir + "/error", // /logs/error 하위에 저장
    filename: `%DATE%.error.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
    maxFiles: 30,
    zippedArchive: true,
  }),
];
//* uncaughtException 발생시 파일 설정
const exceptionHandlers = [
  new winstonDaily({
    level: "error",
    datePattern: "YYYY-MM-DD",
    dirname: logDir + "/errorCatch",
    filename: `%DATE%.exception.log`,
    maxFiles: 30,
    zippedArchive: true,
  }),
];

const logger = createLogger({
  format,
  transports,
  exceptionHandlers,
  //* 로그 출력 형식 정의
});

if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize(), // 색깔 넣어서 출력
        format
      ),
    })
  );
}

export { logger };
