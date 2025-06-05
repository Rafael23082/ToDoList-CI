const swaggerJsdoc = require("swagger-jsdoc");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Forum Assignment',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;