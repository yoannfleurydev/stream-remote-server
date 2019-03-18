import { Response, Request } from "express";
import Profile from "../entity/Profile";
import { profileRepository } from "../common/Database";

export const getHealth = (req: Request, res: Response) => {
  res.json({ status: "up" });
};

export const getHello = (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
};

export const postProfile = (req: Request, res: Response) => {
  const profile: Profile = req.body;

  profileRepository.datastore.insert(
    profile,
    (err: Error, document: Profile) => {
      if (err) {
        console.log(err, document);
      } else {
        res.json(document);
      }
    }
  );
};

export const getProfiles = (req: Request, res: Response) => {
  profileRepository.datastore.find(
    {},
    (err: Error, profiles: Array<Profile>) => {
      if (err) {
        console.log("MainService.ts", err, profiles);
      }

      res.json(profiles);
    }
  );
};

export const getProfile = (req: Request, res: Response) => {
  const { id } = req.params;

  profileRepository.datastore.findOne(
    { _id: id },
    (err: Error, profile: Profile) => {
      if (err) {
        console.log("MainService.ts", err, profile);
        res.status(500).json({ message: "Internal Server Error" });
      }

      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json({ message: `Profile ${id} not found` });
      }
    }
  );
};

export const updateProfile = (req: Request, res: Response) => {
  const { id } = req.params;

  profileRepository.datastore.update(
    {
      _id: id
    },
    { $set: { ...req.body } },
    { returnUpdatedDocs: true },
    (err: Error, nbReplaced: number, documents) => {
      if (err) {
        console.error(err, nbReplaced);
      }

      res.json(documents);
    }
  );
};

export const deleteProfile = (req: Request, res: Response) => {
  const { id } = req.params;

  profileRepository.datastore.remove(
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
