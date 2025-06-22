import path from "path";
import access from "../helpers/fileExistence.helper.js";
import { logger } from "../utils/logger.js";

const segmentHandler = async (req, res) => {
  const { segment } = req.params;
  const expected = `${segment}`;

  if (expected !== req.filename) {
    logger.warn(`Token mismatch for segment: ${expected}`);
    return res.status(403).send("Token does not match file");
  }

  const segmentPath = path.join("/videos", segment);
  console.log("segment path", segmentPath);
  if (!(await access(segmentPath))) {
    logger.warn(`Segment not found: ${segmentPath}`);
    return res.status(404).send("Segment not found");
  }

  res.sendFile(segmentPath);
}

export default segmentHandler;