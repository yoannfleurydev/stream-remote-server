import { Router } from "express";
import Controller from "./Controller";
import {
  getHealth,
  getHello,
  postProfile,
  getProfiles,
  getProfile,
  deleteProfile
} from "../service/MainService";

class MainController implements Controller {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  routes(): Router {
    this._router.get("/health", getHealth);
    this._router.get("/hello", getHello);
    this._router.post("/profiles", postProfile);
    this._router.get("/profiles", getProfiles);
    this._router.get("/profiles/:id", getProfile);
    this._router.delete("/profiles/:id", deleteProfile);

    return this._router;
  }
}

export default MainController;
