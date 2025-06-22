import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { logger } from "./utils/logger.js";
import { playlistRouter } from "./routes/playlist.route.js";
import { segmentRouter } from "./routes/segment.route.js";
import { imageRouter } from "./routes/image.route.js";
import swaggerSpec from './utils/swagger.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());

app.use("/video", playlistRouter);
app.use("/video/segments", segmentRouter);
app.use("/image", imageRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});
