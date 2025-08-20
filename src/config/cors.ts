import dotenv from 'dotenv';
import type { CorsOptions } from 'cors';

dotenv.config();

const normalize = (s: string) => s.replace(/\/$/, '').trim();

const explicit = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(normalize)
  .filter(Boolean);

// allow http://localhost:any and http://127.0.0.1:any in dev
const localhostPattern = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

export const corsOptions: CorsOptions = {
  origin(origin, cb) {
    // curl/Postman/server-side fetch sometimes has no Origin
    if (!origin) return cb(null, true);

    const o = normalize(origin);
    if (explicit.includes(o) || localhostPattern.test(o)) {
      return cb(null, true);
    }
    console.warn('CORS blocked origin:', origin);
    cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 204,
};
