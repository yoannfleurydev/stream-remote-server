import { Request, Response } from "express";
import Action from "../entity/Action";
import { actionRepository } from "../common/Database";

export const postAction = (req: Request, res: Response) => {
  const action: Action = Action.fromObject(req.body);

  actionRepository.datastore.insert(action, (err: Error, document: Action) => {
    if (err) {
      console.error(err, document);
    } else {
      res.json(document);
    }
  });
};

export const getActions = (req: Request, res: Response) => {
  actionRepository.datastore.find({}, (err: Error, actions: Array<Action>) => {
    if (err) {
      console.error(err, actions);
    }

    res.json(actions);
  });
};

export const getAction = (req: Request, res: Response) => {
  const { id } = req.params;

  actionRepository.datastore.findOne(
    { _id: id },
    (err: Error, action: Action) => {
      if (err) {
        console.log(err, action);
        res.status(500).json({ message: "Internal Server Error" });
      }

      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ message: `Action ${id} not found` });
      }
    }
  );
};

export const updateAction = (req: Request, res: Response) => {
  const { id } = req.params;

  actionRepository.datastore.update(
    {
      _id: id
    },
    { $set: { ...req.body } },
    { returnUpdatedDocs: true },
    (err: Error, nbReplaced: number, action: Action) => {
      if (err) {
        console.error(err, nbReplaced);
      }

      res.json(action);
    }
  );
};

export const deleteAction = (req: Request, res: Response) => {
  const { id } = req.params;

  actionRepository.datastore.remove(
    { _id: id },
    {}, // Options for the query, check https://github.com/louischatriot/nedb#removing-documents
    (err: Error, nbDeleted: number) => {
      if (err) {
        console.error(err, nbDeleted);
        res.status(500).json({ message: "Internal Server Error" });
      }

      if (nbDeleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: `Action ${id} not found` });
      }
    }
  );
};

export const getActionsForProfile = (req: Request, res: Response) => {
  const { profileId } = req.params;

  actionRepository.datastore.find(
    { profileId },
    (err: Error, actions: Array<Action>) => {
      if (err) {
        console.log(err, actions);
      }

      res.json(actions);
    }
  );
};
