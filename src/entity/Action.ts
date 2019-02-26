import { runInThisContext } from "vm";

class Action {
  name: string;
  icon: string;
  executable: Function;

  constructor(name: string, icon: string, executable: Function) {
    this.name = name;
    this.icon = icon;
    this.executable = executable;
  }
}
