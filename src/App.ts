import express from "express";
import WindowsController from "./controller/WindowsController";
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
    let windowsController = new WindowsController();
    let mainController = new MainController();

    this.express.use("/api", mainController.routes());
    this.express.use("/windows", windowsController.routes());
  }
}

export default new App().express;
