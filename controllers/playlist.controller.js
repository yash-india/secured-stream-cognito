import fs from "fs";
import path from "path";
import readline from "readline";
import access from "../helpers/fileExistence.helper.js";
import { generateSignedSegmentUrl } from "../helpers/signedUrl.helper.js";
import { logger } from "../utils/logger.js";

const playListHandler = async (req, res) => {
  const { filePath } = req.query;
  const userId = req.user.sub;
  if (!filePath) {
    logger.warn(`Path not found: ${filePath}`);
    return res.status(404).send("Path not found");
  }
  const playlistPath = path.join("/videos", filePath);

  try {
    if (!(await access(playlistPath))) {
      logger.warn(`Playlist not found: ${playlistPath}`);
      return res.status(404).send("Playlist not found");
    }

    const readStream = fs.createReadStream(playlistPath, { encoding: "utf8" });
    const rl = readline.createInterface({ input: readStream });

    const outputLines = [];

    let filePathSegments = filePath.split("/");
    filePathSegments.pop(); // Remove the last segment to get the directory path
    filePathSegments = filePathSegments.join("/");

    for await (const line of rl) {
      const trimmed = line.trim();

      // Replace .ts segment filenames with signed URLs
      if (trimmed.endsWith(".ts")) {
        const signedUrl = generateSignedSegmentUrl(
          `${filePathSegments}/${trimmed}`,
          userId,
        );
        outputLines.push(signedUrl);
      } else {
        outputLines.push(trimmed);
      }
    }

    res.set("Content-Type", "application/vnd.apple.mpegurl");
    res.set("Cache-Control", "public, max-age=5");
    res.send(outputLines.join("\n"));
  } catch (err) {
    logger.error(`Error reading playlist: ${err.message}`, { err });
    res.status(500).send("Internal Server Error");
  }
}

export default playListHandler;