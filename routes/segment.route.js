import express from "express";
import { validateSegmentToken } from "../middlewares/segment.middleware.js";
import segmentHandler from "../controllers/segment.controller.js";

export const segmentRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Segment
 *   description: Segment related endpoints
 */

/**
 * @swagger
 * /video/segments/{segment}:
 *   get:
 *     summary: Get segment data by segment id
 *     tags: [Segment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: segment
 *         required: true
 *         schema:
 *           type: string
 *         description: Segment ID
 *     responses:
 *       200:
 *         description: Segment stream returned successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Token does not match file
 *       404:
 *         description: Segment not found
 *       500:
 *         description: Internal server error
 */
segmentRouter.get("/:segment", validateSegmentToken, segmentHandler);
