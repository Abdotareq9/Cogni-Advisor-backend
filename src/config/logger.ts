import winston from "winston";
import { join } from "path";

const { combine, timestamp, printf, colorize, json, errors } = winston.format;
const isProduction = process.env.NODE_ENV === "production";

const textFormat = printf(({ level, message, timestamp, requestId, ...meta }) => {
  const rid = requestId ? ` [${requestId}]` : "";
  const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `${timestamp}${rid} [${level}]: ${message}${extra}`;
});

const consoleFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  colorize(),
  textFormat
);

const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json()
);

const logsDir = join(process.cwd(), "logs");

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  transports: [
    new winston.transports.Console({
      format: isProduction ? combine(timestamp(), errors({ stack: true }), json()) : consoleFormat
    }),
    new winston.transports.File({
      filename: join(logsDir, "error.log"),
      level: "error",
      format: fileFormat
    }),
    new winston.transports.File({
      filename: join(logsDir, "combined.log"),
      format: fileFormat
    })
  ]
});

export const createMorganStream = () => ({
  write: (message: string) => {
    logger.http(message.trim());
  }
});
