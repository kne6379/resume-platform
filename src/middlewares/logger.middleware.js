import { logger } from "../configs/logger.config.js";

async function loggingMiddleware(req, res, next) {
  try {
    const start = new Date().getTime();

    res.on("finish", () => {
      const duration = new Date().getTime() - start;
      logger.info("message", {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        responseTime: duration,
      });
    });

    next();
  } catch (error) {
    next(error);
  }
}

export { loggingMiddleware };
