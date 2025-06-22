import express from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import playListHandler from "../controllers/playlist.controller.js";

export const playlistRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Playlist related endpoints
 */

/**
 * @swagger
 * /video:
 *   get:
 *     summary: Get playlist data
 *     tags: [Playlist]
 *     parameters:
 *       - in: query
 *         name: filePath
 *         required: true
 *         schema:
 *           type: string
 *         description: Path of the playlist file to retrieve
 *       - in: query
 *         name: auth
 *         required: true
 *         schema:
 *           type: string
 *         description: Authentication token
 *     responses:
 *       200:
 *         description: Playlist stream returned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Internal server error
 */
playlistRouter.get("/", validateToken, playListHandler);
