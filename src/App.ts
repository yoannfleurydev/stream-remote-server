import * as express from "express";
import * as cp from "child_process";

class App {
  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get("/", (req, res) => {
      cp.exec("explorer", (error, stdout, stderr) => {
        console.error(error);
      });
      res.json({
        message: "Hello World!"
      });
    });

    this.express.use("/", router);
  }
}

export default new App().express;
