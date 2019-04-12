import errorHandler from "errorhandler";
import app from "./App";
import { generateIpQrCode } from "./common/Utils";
import { savePlugins } from "./service/PluginService";

// Load all the plugins in database at the boot of the server.
savePlugins();

const PORT: string = process.env.PORT || "3000";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

app.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  return console.log(`Server is listening on ${PORT}`);
});

generateIpQrCode(PORT);
