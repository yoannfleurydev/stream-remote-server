import { DATA_STORAGE } from "./const";
import internalIp from "internal-ip";
import * as qrcode from "qrcode-terminal";
import { name } from "../../package.json";

// Get the directory of the system where applications store data.
export const getAppDataStorage = (): string => {
  return (
    // APPDATA is only available on Windows
    process.env.APPDATA + "\\" + name + "\\" + DATA_STORAGE ||
    // If the platform is darwin, then append Library/Preferences
    // Else the platform is linux, then append /.local/share
    process.env.HOME +
      (process.platform === "darwin"
        ? "Library/Preferences"
        : "/.local/share") +
      `/${name}/${DATA_STORAGE}`
  );
};

// Generate QR Code with the internal IP and the port of the server.
export const generateIpQrCode = (port: string) => {
  internalIp.v4().then(ip => {
    qrcode.setErrorLevel("Q");
    qrcode.generate(`${ip}:${port}`);
  });
};
