// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';

import userRoutes from './routes/user.route';
import swaggerSpec from './config/swagger'; 

dotenv.config();

export const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

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
