import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const TTL = env.TOKEN_EXPIREY;

export function generateSignedSegmentUrl(filename, userId) {
  const exp = Math.floor(Date.now() / 1000) + TTL;
  const token = jwt.sign({ filename, userId, exp }, env.SEGMENT_SIGNING_SECRET);
  return `/video/segments/${encodeURIComponent(filename)}?token=${token}`;
}
