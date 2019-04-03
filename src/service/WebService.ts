import { Response, Request } from "express";

export const getHealth = (req: Request, res: Response) => {
  res.json({ status: "up" });
};
