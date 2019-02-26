import { Request, Response, Router } from "express";
import * as cp from "child_process";
import Controller from "./Controller";

const EXPLORER = "explorer";

class WindowsController implements Controller {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  routes(): Router {
    this._router.get(`/${EXPLORER}`, (req: Request, res: Response) => {
      cp.exec(
        EXPLORER,
        (error: cp.ExecException, stdout: string, stderr: string) => {
          console.error(error);
        }
      );

      res.json({
        status: "success"
      });
    });

    return this._router;
  }
}

export default WindowsController;
