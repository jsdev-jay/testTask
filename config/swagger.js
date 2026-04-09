import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API documentation for the Task Manager application",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
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
    tags: [
      {
        name: "Users",
        description: "API for user management",
      },
      {
        name: "Projects",
        description: "API for project management",
      },
      {
        name: "Tasks",
        description: "API for task management",
      },
      {
        name: "Comments",
        description: "API for comment management",
      },
    ],
  },
  apis: ["./router/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
