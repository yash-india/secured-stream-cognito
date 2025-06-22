import { access } from "fs/promises";
import { constants } from "fs";

const checkFile = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export default checkFile;
