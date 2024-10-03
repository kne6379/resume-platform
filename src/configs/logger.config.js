import winston from "winston";

const { createLogger, format, transports } = winston;
const { combine, printf, colorize, timestamp } = format;

const logFormat = printf(info => {
  return `    [ ${info.level} ][ ${info.timestamp} ]
    [ method: ${info.method} ]
    [ url: ${info.url} ]
    [ status: ${info.status} ]
    [ responseTime: ${info.responseTime}ms ] - ${info.message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    colorize(),
    logFormat
  ),
  transports: [new transports.Console()],
});

export { logger };
