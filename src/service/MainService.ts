import { Response, Request } from "express";
import Profile from "../entity/Profile";
import database from "../common/Database";

export const getHealth = (req, res) => {
  res.json({ status: "up" });
};

export const getHello = (req, res) => {
  res.json({ message: "Hello World" });
};

export const postProfile = (req: Request, res: Response) => {
  const profile: Profile = req.body;

  database.datastore.insert(profile, (err: Error, document: Profile) => {
    if (err) {
      console.log("MainService.ts", err, document);
    } else {
      res.json(profile);
    }
  });
};

export const getProfiles = (req: Request, res: Response) => {
  database.datastore.find({}, (err: Error, profiles: Array<Profile>) => {
    if (err) {
      console.log("MainService.ts", err, profiles);
    }

    res.json(profiles);
  });
};

export const getProfile = (req: Request, res: Response) => {
  const { id } = req.params;

  database.datastore.findOne({ _id: id }, (err: Error, profile: Profile) => {
    if (err) {
      console.log("MainService.ts", err, profile);
      res.status(500).json({ message: "Internal Server Error" });
    }

    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: `Profile ${id} not found` });
    }
  });
};

export const deleteProfile = (req: Request, res: Response) => {
  const { id } = req.params;

  database.datastore.remove(
    { _id: id },
    {}, // Options for the query, check https://github.com/louischatriot/nedb#removing-documents
    (err: Error, nbDeleted: number) => {
      if (err) {
        console.log("MainService.ts", err, nbDeleted);
        res.status(500).json({ message: "Internal Server Error" });
      }

      if (nbDeleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: `Profile ${id} not found` });
      }
    }
  );
};
