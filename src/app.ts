// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';

import userRoutes from './routes/user.route';
import swaggerSpec from './config/swagger'; 
import { corsOptions } from './config/cors';
import { applySecurityMiddlewares } from './config/security';
import { httpLogger, wireProcessLogging, logger } from './config/logger';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

export const app = express();
// trust proxy for secure cookies behind Render/NGINX/etc.
app.set('trust proxy', 1);
app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));


// Process-level logging for crashes
wireProcessLogging();


app.use(express.json());

//security middlewares
applySecurityMiddlewares(app);

// CORS configuration

// HTTP request logging (must come after proxy/cors if you want accurate data)
app.use(httpLogger);


app.get('/openapi.json', (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.type('application/json').send(swaggerSpec);
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

app.get(
  '/docs',
  redoc({
    title: 'Scafold API',
    specUrl: '/openapi.json',
  })
);

//Routes
app.use('/api/users', userRoutes);


app.get('/', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Dedatahub API</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9f9f9; color: #333; }
        h1 { color: #2c3e50; }
        a { display: inline-block; margin: 10px; padding: 10px 20px; text-decoration: none; background: #007bff; color: white; border-radius: 5px; transition: 0.3s ease; }
        a:hover { background: #0056b3; }
      </style>
    </head>
    <body>
      <h1>Scafold API</h1>
      <p>Express + TypeScript + Drizzle + Supabase</p>
      <a href="/api-docs" target="_blank">Swagger UI</a>
      <a href="/docs" target="_blank">Redoc</a>
    </body>
    </html>
  `);
});

logger.info('App initialized');

app.use(errorHandler);