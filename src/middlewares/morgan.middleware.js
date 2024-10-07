import morgan from "morgan";
import { logger } from "../configs/logger.config.js";
import { NODE_ENV } from "../constants/env.constants.js";

const format = () => {
  const result =
    NODE_ENV === "production"
      ? '[:remote-addr - :remote-user] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"'
      : ":method :url :status :response-time ms - :res[content-length]";
  return result;
};

const stream = {
  write: message => {
    logger.info(message);
  },
};

// 상태 코드별 글자색 설정, 현재 에러코드는 출력하지 않으므로 사용하지 않는다.
morgan.token("status", function (req, res) {
  let color;
  if (res.statusCode < 300) color = "\x1B[32m"; //green
  else if (res.statusCode < 400) color = "\x1B[36m"; //cyan
  else if (res.statusCode < 500) color = "\x1B[33m"; //yellow
  else if (res.statusCode < 600) color = "\x1B[31m"; //red
  else color = "\x1B[0m"; /*글자색 초기화*/

  return color + res.statusCode + "\x1B[35m"; /*보라색*/
});

const morganMiddleware = morgan(format(), { stream });

export { morganMiddleware };
