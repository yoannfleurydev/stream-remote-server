import { Request, Response } from "express";
import * as cp from "child_process";

export const openExplorer = (req: Request, res: Response) => {
  cp.exec(
    "explorer",
    (error: cp.ExecException, stdout: string, stderr: string) => {
      console.error(error);
    }
  );

  res.json({
    status: "success"
  });
};
