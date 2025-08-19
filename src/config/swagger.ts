import swaggerJSDoc, { OAS3Options } from "swagger-jsdoc";

const options: OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scafold API",
      description: "Scafold Backend API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://sample-api.vercel.app/",
        description: "Production",
      },
      {
        url: "http://localhost:5000",
        description: "Local",
      },
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
  },
  // Adjust the path depending on where your route files live
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
