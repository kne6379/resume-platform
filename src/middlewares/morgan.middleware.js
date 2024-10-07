import morgan from "morgan";
import { logger } from "../configs/logger.config.js";
import { NODE_ENV } from "../constants/env.constants.js";

// morgan에서 사용할 포맷을 정의
// 개발 환경에서는 간결한 형식, 배포 환경에서는 자세한 로그 형식을 사용
const format =
  NODE_ENV === "production"
    ? '[:remote-addr - :remote-user] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"'
    : ":method :url :status :response-time ms - :res[content-length]";

// logger.info 레벨로 출력하게 되며, morgan의 로그가 여기에 기록된다.
const stream = {
  write: message => {
    logger.info(message);
  },
};

// 상태 코드별 글자색 설정
morgan.token("status", function (req, res) {
  let color;
  if (res.statusCode < 300) color = "\x1B[32m"; //green
  else if (res.statusCode < 400) color = "\x1B[36m"; //cyan
  else if (res.statusCode < 500) color = "\x1B[33m"; //yellow
  else if (res.statusCode < 600) color = "\x1B[31m"; //red
  else color = "\x1B[0m"; /*글자색 초기화*/

  return color + res.statusCode + "\x1B[35m"; /*보라색*/
});

// morgan 미들웨어 생성
// morgan에 설정된 포맷과 stream을 적용
const morganMiddleware = morgan(format, { stream });

export { morganMiddleware };
