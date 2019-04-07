import Nedb from "nedb";
import { getAppDataStorage } from "../common/Utils";
import Profile from "../entity/Profile";
import Action from "../entity/Action";
import Plugin from "../entity/Plugin";

class Database {
  private _datastore: Nedb;

  constructor(type: string) {
    this._datastore = new Nedb({
      filename: getAppDataStorage(type),
      autoload: true
    });
  }

  get datastore(): Nedb {
    return this._datastore;
  }
}

export default Database;

export const profileRepository = new Database(Profile.TYPE);
export const actionRepository = new Database(Action.TYPE);
export const pluginRepository = new Database(Plugin.TYPE);
