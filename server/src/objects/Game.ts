import { COLORS, GAME_WIDTH } from "../constants";
import { IPlayer, IPosition } from "../interfaces";
import { getRandomInteger } from "../utils/commons";
import { Food } from "./Food";
import { Player } from "./Player";

export class Game {
  private Foods: Food[];
  private Players: Player[];
  constructor() {
    this.Foods = [];
    this.Players = [];
  }
  public get foods(): Food[] {
    return this.Foods;
  }
  public set foods(value: Food[]) {
    this.Foods = value;
  }
  public get players(): Player[] {
    return this.Players;
  }
  public set players(value: Player[]) {
    this.Players = value;
  }

  createFoods = (_length: number) => {
    for (let i = 0; i < _length; i++) {
      const _pos = {
        x: getRandomInteger(0, GAME_WIDTH),
        y: getRandomInteger(0, GAME_WIDTH),
      };
      const _color = COLORS[getRandomInteger(0, COLORS.length - 1)];
      const _size = getRandomInteger(1, 5);
      this.createOneFood(_pos, _color, _size);
    }
  };

  createOneFood(
    _pos: IPosition,
    _color: string,
    _size: number,
    _borderColor?: string
  ) {
    this.foods.push(new Food(_pos, _color, _size, _borderColor));
  }

  createPlayer(_id: string, _name: string) {
    this.players.push(new Player(_id, _name, this));
  }
}
