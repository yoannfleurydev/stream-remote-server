import { Router } from "express";
import Controller from "./Controller";
import { openExplorer } from "../service/WindowsService";

class WindowsController implements Controller {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  routes(): Router {
    this._router.get("/explorer", openExplorer);

    return this._router;
  }
}

export default WindowsController;
