import access from "../helpers/fileExistence.helper.js";
import { logger } from "../utils/logger.js";

const imageHandler = async (req, res) => {
  const { filePath } = req.query;
  const userId = req.user?.sub;

  logger.info(`User ${userId} requested image: ${filePath}`);

  const fileabsPath = path.join("/images", filePath);

  try {
    await access(fileabsPath);
    res.sendFile(fileabsPath);
  } catch (err) {
    logger.error(`Image not found at ${filePath}:`, err.message);
    res.status(404).send("Image not found");
  }
}

export default imageHandler;