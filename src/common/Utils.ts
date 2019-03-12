import { DATA_STORAGE } from "./const";
import internalIp from "internal-ip";
import * as qrcode from "qrcode-terminal";
import { name } from "../../package.json";

// Get the directory of the system where applications store data.
export const getAppDataStorage = (type: string): string => {
  const filename = `${type}.${DATA_STORAGE}`;

  return (
    // APPDATA is only available on Windows
    process.env.APPDATA + "\\" + name + "\\" + filename ||
    // If the platform is darwin, then append Library/Preferences
    // Else the platform is linux, then append /.local/share
    process.env.HOME +
      (process.platform === "darwin"
        ? "Library/Preferences"
        : "/.local/share") +
      `/${name}/${filename}`
  );
};

// Generate QR Code with the internal IP and the port of the server.
export const generateIpQrCode = (port: string) => {
  internalIp.v4().then(ip => {
    if (!ip) {
      console.log("No IP available. Are you connected on a network?");
      ip = "localhost";
    }

    qrcode.setErrorLevel("Q");
    qrcode.generate(`${ip}:${port}`);
  });
};
