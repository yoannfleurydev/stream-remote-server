import { Entity } from "./Entity";

export default class Action implements Entity {
  public static TYPE = "ACTION";

  _id: string;
  name: string;
  icon: string;
  executable: Executable;

  constructor(name: string, icon: string, executable: Executable) {
    this.name = name;
    this.icon = icon;
    this.executable = executable;
  }
}

interface Executable {
  method: Method;
  route: string;
  parameters: Map<string, string>;
}

enum Method {
  GET,
  POST
}
