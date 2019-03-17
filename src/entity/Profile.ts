import { Entity } from "./Entity";

export default class Profile implements Entity {
  public static TYPE = "PROFILE";

  _id: string;
  color: string;
  name: string;

  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }
}
