import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { Express } from 'express';

export const applySecurityMiddlewares = (app: Express) => {
  // Helmet adds various HTTP headers for security
  app.use(helmet());

  // Gzip / Brotli compression
  app.use(compression());

  // Parse cookies
  app.use(cookieParser());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      message: 'Too many requests from this IP, please try again later.',
    })
  );
};
