import * as errorHandler from "errorhandler";
import app from "./App";

const PORT = process.env.PORT || 3000;
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
