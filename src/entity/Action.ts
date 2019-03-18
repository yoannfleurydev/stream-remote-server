import { Entity } from "./Entity";

export default class Action implements Entity {
  public static TYPE = "ACTION";

  _id: string;
  name: string;
  icon: string;
  executable: Executable;
  profileId: string;

  constructor(
    name: string,
    icon: string,
    executable: Executable,
    profileId: string
  ) {
    this.name = name;
    this.icon = icon;
    this.executable = executable;
    this.profileId = profileId;
  }

  public static fromObject(action: Action): Action {
    return new Action(
      action.name,
      action.icon,
      action.executable,
      action.profileId
    );
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
