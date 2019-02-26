import * as Nedb from "nedb";
import { getAppDataStorage } from "../common/Utils";

class Database {
  private _datastore: Nedb;

  constructor() {
    this._datastore = new Nedb({
      filename: getAppDataStorage(),
      autoload: true
    });
  }

  get datastore(): Nedb {
    return this._datastore;
  }
}

export default new Database();
