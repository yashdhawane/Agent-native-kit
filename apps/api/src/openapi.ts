import swaggerJSDoc from "swagger-jsdoc";

export const openapiSpec = swaggerJSDoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Agent Native API",
      version: "0.1.0",
      description: "API for the Agent Native Software Engineering Template.",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/**/*.ts"],
});