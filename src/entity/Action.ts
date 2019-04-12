import { Entity } from "./Entity";

export default class Action implements Entity {
  public static TYPE = "ACTION";

  _id: string;
  name: string;
  icon: string;
  operations: Array<Executable>;
  profileId: string;

  constructor(
    name: string,
    icon: string,
    operations: Array<Executable>,
    profileId: string
  ) {
    this.name = name;
    this.icon = icon;
    this.operations = operations;
    this.profileId = profileId;
  }

  public static fromObject(action: Action): Action {
    return new Action(
      action.name,
      action.icon,
      action.operations,
      action.profileId
    );
  }
}

export interface Operation {
  key: string;
  name: string;
  description: string;
  executable: Executable;
}

export interface Executable {
  method: Method;
  route: string;
  parameters: Map<string, string>;
}

export enum Method {
  GET,
  POST
}
