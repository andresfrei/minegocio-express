const path = require("path");

const apiPath = path.join(__dirname, "..", "routes", "api", "*.js");
const apiCash = path.join(__dirname, "..", "routes", "api", "cash", "*.js");
//const adminPath = path.join(__dirname, "..", "routes", "admin", "*.js");

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Documentation",
      description:
        "Esta API se ancarga de manejar la información de la empresa MiNegocio.Ar",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://siscod1.ddns.net:3005",
      },
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        userAuth: {
          type: "apiKey",
          in: "header",
          name: "auth",
        },
      },
      schemas: {
        userLogin: {
          type: "object",
          required: ["username", "password", "key"],
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
            key: {
              type: "string",
            },
          },
        },
        userToken: {
          type: "object",
          properties: {
            token: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: [apiPath, apiCash],
};

module.exports = { swaggerOptions };
