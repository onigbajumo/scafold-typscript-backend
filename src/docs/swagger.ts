import path from "path";
import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";

const definition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Your API",
    description: "Express + Drizzle + Supabase backend",
    version: "1.0.0",
  },
  servers: [
    { url: "http://localhost:5000", description: "Local" },
    // { url: "https://your-render-app.onrender.com", description: "Production" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export const swaggerSpec = swaggerJSDoc({
  definition,
  // IMPORTANT: support both TS (dev) and JS (after build)
  apis: [
    path.join(process.cwd(), "src/routes/*.ts"),
    path.join(process.cwd(), "dist/routes/*.js"),
  ],
});
