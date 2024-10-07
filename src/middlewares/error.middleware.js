import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { logger } from "../configs/logger.config.js";
import { MESSAGES } from "../constants/message.constants.js";

async function errorMiddleware(error, req, res, next) {
  if (error.name === "ValidationError") {
    logger.error(error.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
  } else if (error) {
    logger.error(error);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
  }
  logger.error(MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
}

export { errorMiddleware };
