import winston from 'winston';
import morgan from 'morgan';

/**
 * Winston logger (structured logs)
 */
const level = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');
const isDev = process.env.NODE_ENV !== 'production';

// Console format: pretty in dev, json in prod
const consoleFormat = isDev
  ? winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, ...meta }) => {
        const rest = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] ${level}: ${message}${rest}`;
      })
    )
  : winston.format.combine(winston.format.timestamp(), winston.format.json());

export const logger = winston.createLogger({
  level,
  transports: [new winston.transports.Console({ format: consoleFormat })],
});

/**
 * Morgan HTTP request logger (pipe to winston)
 * Use 'dev' in development; 'combined' in production
 */
export const httpLogger = morgan(isDev ? 'dev' : 'combined', {
  stream: {
    write: (msg: string) => {
      // morgan includes trailing newline
      logger.http ? logger.http(msg.trim()) : logger.info(msg.trim());
    },
  },
});

/**
 * Helper to log unhandled errors/rejections at process level
 */
export function wireProcessLogging() {
  process.on('unhandledRejection', (reason) => {
    logger.error('UNHANDLED_REJECTION', { reason });
  });
  process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT_EXCEPTION', { message: err.message, stack: err.stack });
    // Optionally exit in prod:
    // process.exit(1);
  });
}
