import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

export function validateSegmentToken(req, res, next) {
  const token = req.query.token;
  if (!token) return res.status(401).send("Missing token");

  jwt.verify(token, env.SEGMENT_SIGNING_SECRET, (err, payload) => {
    if (err) {
      logger.warn("Invalid segment token", err);
      return res.status(403).send("Invalid or expired token");
    }

    req.filename = payload.filename;
    req.userId = payload.userId;
    next();
  });
}
