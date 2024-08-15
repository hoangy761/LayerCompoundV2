import { Game } from "./Game";
import { Snake } from "./Snake";

export class Player {
  private Id: string;
  public get id(): string {
    return this.Id;
  }
  public set id(value: string) {
    this.Id = value;
  }
  private Name: string;
  public get name(): string {
    return this.Name;
  }
  public set name(value: string) {
    this.Name = value;
  }
  private Snake: Snake;
  public get snake(): Snake {
    return this.Snake;
  }
  public set snake(value: Snake) {
    this.Snake = value;
  }
  constructor(_id: string, _name: string, _game: Game) {
    this.Id = _id;
    this.Name = _name;
    this.Snake = new Snake(_game);
  }
}
