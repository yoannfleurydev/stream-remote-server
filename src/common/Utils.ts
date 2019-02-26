import { DATA_STORAGE } from "./const";
import * as packageJson from "../../package.json";

// Get the directory of the system where applications store data.
export const getAppDataStorage = (): string => {
  return (
    // APPDATA is only available on Windows
    process.env.APPDATA + "\\" + packageJson.name + "\\" + DATA_STORAGE ||
    // If the platform is darwin, then append Library/Preferences
    // Else the platform is linux, then append /.local/share
    process.env.HOME +
      (process.platform === "darwin"
        ? "Library/Preferences"
        : "/.local/share") +
      `/${packageJson.name}/${DATA_STORAGE}`
  );
};
