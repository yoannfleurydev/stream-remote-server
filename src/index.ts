import errorHandler from "errorhandler";
import app from "./App";
import { generateIpQrCode } from "./common/Utils";

const PORT: string = process.env.PORT || "3000";

/**
 * Error Handler. Provides full stask - remove for production
 */
app.use(errorHandler());

app.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  return console.log(`Server is listening on ${PORT}`);
});

generateIpQrCode(PORT);
