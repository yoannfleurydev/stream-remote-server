import express from "express";
import MainController from "./controller/MainController";
import bodyParser from "body-parser";
import cors from "cors";

class App {
  public express;

  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.mountRoutes();
  }

  private mountRoutes(): void {
    let mainController = new MainController();

    this.express.use("/api", mainController.routes());
  }
}

export default new App().express;
