import express from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import imageHandler from "../controllers/image.controller.js";

export const imageRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Image
 *   description: Image related endpoints
 */

/**
 * @swagger
 * /image:
 *   get:
 *     summary: Get image data
 *     tags: [Image]
 *     parameters:
 *       - in: query
 *         name: filePath
 *         required: true
 *         schema:
 *           type: string
 *         description: Path of the image file to retrieve
 *       - in: query
 *         name: auth
 *         required: true
 *         schema:
 *           type: string
 *         description: Authentication token
 *     responses:
 *       200:
 *         description: Image stream returned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
imageRouter.get("/", validateToken, imageHandler);
