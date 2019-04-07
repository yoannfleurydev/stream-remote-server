import { Dirent } from "fs";
import { Entity } from "./Entity";

export default class Plugin implements Entity {
  public static TYPE = "PLUGIN";

  _id: string;
  pluginPath: string;
  name: string;
  main: string;
  key: string;
  operations: Array<Object>;

  constructor(
    path: string,
    dirent: Dirent,
    packageJSON: PackageJSON,
    operations: Array<Object>
  ) {
    this.pluginPath = `${path}/${dirent.name}`;
    this.main = packageJSON.main;
    this.name = packageJSON.name;
    this.operations = operations;
  }
}

class PackageJSON {
  main: string;
  name: string;
}
