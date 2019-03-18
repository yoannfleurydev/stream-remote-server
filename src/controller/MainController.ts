import { Router } from "express";
import Controller from "./Controller";
import {
  getHealth,
  getHello,
  postProfile,
  getProfiles,
  getProfile,
  deleteProfile,
  updateProfile
} from "../service/ProfileService";
import {
  postAction,
  getActions,
  getAction,
  deleteAction,
  updateAction,
  getActionsForProfile
} from "../service/ActionService";

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
    this._router.patch("/profiles/:id", updateProfile);
    this._router.delete("/profiles/:id", deleteProfile);
    this._router.post("/actions", postAction);
    this._router.get("/actions", getActions);
    this._router.get("/actions/:id", getAction);
    this._router.patch("/actions/:id", updateAction);
    this._router.delete("/actions/:id", deleteAction);
    this._router.get("/profiles/:profileId/actions", getActionsForProfile);

    return this._router;
  }
}

export default MainController;
