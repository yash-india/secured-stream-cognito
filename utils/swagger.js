// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Live Stream API',
      version: '1.0.0',
      description: 'API documentation for the live stream secure service',
    },
    servers: [
      {
        url: 'http://localhost:3000', // change to your domain
      },
    ],
  },
  apis: ['./routes/*.js', './index.js'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
