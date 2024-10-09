import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { NODE_ENV } from "../constants/env.constants.js";

// winstonDaily: 로그 파일을 일별로 분리하여 저장하고,
// 주기(일별, 시간별 등)에 따라 새로운 파일로 로테이션하며 기록한다.
// (주기 별로 새로운 파일이 생성된다는 의미)

// 구조 분해 할당을 통해 불필요한 반복을 줄인다.
const { createLogger } = winston;
const { combine, printf, timestamp, colorize } = winston.format;

// 하단의 transports 배열에서는 winston에서 제공하는
// 클래스를 사용하여 인스턴스를 생성할 수 있다.
// 이 때, 로그를 어떻게 기록할 것인지는 사용하는 클래스에 따라 결정된다. (콘솔, 파일 등)
// 현재 로그는 info 레벨, error 레벨, 전역적으로 처리되지 않은 uncaughtException에 대해
//  각각 3종류의 파일로 분류하여 저장된다. 개발 환경일 경우 콘솔에도 로그를 출력하도록 설정되어 있다.

// 로그 저장 디렉토리 설정
const logDir = "logs";

// 로그 포맷 설정, 기록되는 로그의 내용을 정의한다.
const format = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(info => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`)
  // combine()은 아래의 속성을 조합한다.
  // timestamp와 printf 포맷 형식이 정의되어 format에 들어간다.
);

// 실제 로그를 어떻게 기록할 것인지 정의한다.
const transports = [
  // info 레벨 로그를 저장할 파일 설정 (info 레벨 이상 로그가 저장된다.)
  new winstonDaily({
    level: "info", // info 레벨 이상에서는,
    datePattern: "YYYY-MM-DD", // 파일 날짜 형식
    dirname: logDir + "/info", // 파일 경로
    filename: `%DATE%.info.log`, // 파일 이름
    maxFiles: 30, // 최근 30일치 로그 파일을 유지
    zippedArchive: true, // 오래된 로그를 압축하여 저장,
  }),
  // error 레벨 로그를 저장할 파일 설정
  // (error 레벨 이상의 로그만 포함, 즉 info에 포함되지만 일부러 따로 빼서 설정)
  new winstonDaily({
    level: "error", // error 레벨에서는,
    datePattern: "YYYY-MM-DD",
    dirname: logDir + "/error",
    filename: `%DATE%.error.log`,
    maxFiles: 30,
    zippedArchive: true,
  }),
];

// uncaughtException 발생 시 처리 설정
// 별도로 선언된 이유는 transports가 아닌,
// exceptionHandlers 속성에 해당 값을 넣어줘야 하기 때문이다.
// exceptionHandlers는 전역적으로 처리되지 않은 예외를 처리한다.
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

// 위의 객체들을 모아 logger 인스턴스를 생성
const logger = createLogger({
  format, // 로그 포맷 설정
  transports, // 로그 기록 설정
  exceptionHandlers, // uncaughtException 처리 설정
});

// 개발 환경에서만 콘솔 출력 속성을 추가한다.
// 배포 환경에서는 로그를 콘솔에 출력하면 로그 확인이 어렵고,
// 과도한 콘솔 출력은 성능 저하를 유발할 수 있다.
// 따라서 콘솔 출력은 개발 환경에서만 동작하도록 설정한다.
if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      // winston의 콘솔 인스턴스 생성
      format: combine(
        colorize(), // 색상을 사용하여 출력
        format // 상단에서 정의한 로그 포맷을 재사용
      ),
    })
  );
}

export { logger };
