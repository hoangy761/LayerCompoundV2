import {
  COLORS,
  GAME_WIDTH,
  INIT_SNAKE_LENGTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SNAKE_SPEED,
} from "../constants";
import { IDot, IPosition, ISnake, IStyle } from "../interfaces";
import { getRandomInteger } from "../utils/commons";
import {
  getPointOnCircumference,
  isEat,
  isPointOutsideCircle,
} from "../utils/game/position";
import { Food } from "./Food";
import { Game } from "./Game";

export class Snake {
  private IsPeedUP: boolean;
  public get isPeedUP(): boolean {
    return this.IsPeedUP;
  }
  public set isPeedUP(value: boolean) {
    this.IsPeedUP = value;
  }
  private Angle: number;
  public get angle(): number {
    return this.Angle;
  }
  public set angle(value: number) {
    this.Angle = value;
  }
  private TailPositions: IPosition[];
  public get tailPositions(): IPosition[] {
    return this.TailPositions;
  }
  public set tailPositions(value: IPosition[]) {
    this.TailPositions = value;
  }
  private Speed: number;
  public get speed(): number {
    return this.Speed;
  }
  public set speed(value: number) {
    this.Speed = value;
  }
  private IsAlive: boolean;
  public get isAlive(): boolean {
    return this.IsAlive;
  }
  public set isAlive(value: boolean) {
    this.IsAlive = value;
  }
  private Position: IPosition;
  public get position(): IPosition {
    return this.Position;
  }
  public set position(value: IPosition) {
    this.Position = value;
  }
  private PositionCollision: IPosition;
  public get positionCollision(): IPosition {
    return this.PositionCollision;
  }
  public set positionCollision(value: IPosition) {
    this.PositionCollision = value;
  }
  private Style: IStyle;
  public get style(): IStyle {
    return this.Style;
  }
  public set style(value: IStyle) {
    this.Style = value;
  }
  private StyleShadow: IStyle;
  public get styleShadow(): IStyle {
    return this.StyleShadow;
  }
  public set styleShadow(value: IStyle) {
    this.StyleShadow = value;
  }
  game: Game;
  constructor(_game: Game) {
    this.game = _game;
    this.Angle = 0;
    this.Position = {
      x: getRandomInteger(SCREEN_WIDTH / 2, GAME_WIDTH - SCREEN_WIDTH / 2),
      y: getRandomInteger(SCREEN_HEIGHT / 2, GAME_WIDTH - SCREEN_HEIGHT / 2),
    };
    this.TailPositions = this.createTail(INIT_SNAKE_LENGTH, this.position);
    this.PositionCollision = {
      x: this.position.x + this.tailPositions.length / 5,
      y: this.position.y,
    };
    this.Speed = SNAKE_SPEED;
    this.IsAlive = true;
    this.Style = {
      borderColor: COLORS[getRandomInteger(0, COLORS.length - 1)],
      color: COLORS[getRandomInteger(0, COLORS.length - 1)],
      size: this.tailPositions.length / 5,
    };
    this.StyleShadow = {
      // borderColor: 'rgba(0,0,0,0.1)',
      color: "rgba(0,0,0,0.1)",
      size: this.tailPositions.length / 5 + this.tailPositions.length / 5 / 9,
    };
    this.IsPeedUP = false;
  }

  createTail(initLenght: number, position: IPosition) {
    const tailPositions: IPosition[] = [];
    for (let index = 0; index < initLenght; index++) {
      tailPositions.push({
        x: position.x - SNAKE_SPEED * index,
        y: position.y,
      });
    }
    return tailPositions;
  }

  update() {}
  feces() {
    this.game.createOneFood(
      this.tailPositions[this.tailPositions.length - 1],
      COLORS[getRandomInteger(0, COLORS.length - 1)],
      1
    );
  }
  run() {
    if (this.tailPositions.length > INIT_SNAKE_LENGTH) {
      if (this.isPeedUP) {
        this.speed = SNAKE_SPEED * 2;
        this.tailPositions = this.tailPositions.slice(0, -3);
        this.style.size = this.tailPositions.length / 5;
        this.feces();
      } else {
        this.speed = SNAKE_SPEED;
      }
    } else {
      this.speed = SNAKE_SPEED;
    }
    const newTailPosition = {
      x: this.position.x + Math.cos(this.angle) * this.speed,
      y: this.position.y + Math.sin(this.angle) * this.speed,
    };
    this.tailPositions.unshift(newTailPosition);
    this.tailPositions.pop();
    this.position = newTailPosition;
    this.positionCollision = getPointOnCircumference(
      this.position,
      this.style.size,
      this.angle
    );
  }

  eat(_foods: Food[]) {
    for (let i = 0; i < _foods.length; i++) {
      const isMatch = isEat(
        this.position,
        this.style.size,
        this.angle,
        _foods[i].pos
      );
      if (isMatch) {
        this.growth(_foods[i].size);
        _foods.splice(i, 1);
      }
    }
  }

  growth(numberCalo: number) {
    for (let i = 0; i < numberCalo; i++) {
      const newTailPosition = {
        x: this.position.x + Math.cos(this.angle) * this.speed,
        y: this.position.y + Math.sin(this.angle) * this.speed,
      };
      this.tailPositions.push(newTailPosition);
      // this.position = newTailPosition;
    }

    this.style.size = this.tailPositions.length / 5;
    this.positionCollision = getPointOnCircumference(
      this.position,
      this.style.size,
      this.angle
    );
  }

  checkSnakecollisionSnake() {
    this.game.players.forEach((player) => {
      if (player.snake.positionCollision !== this.positionCollision) {
        player.snake.TailPositions.forEach((oSnake) => {
          let isCollision = isPointOutsideCircle(
            oSnake,
            this.positionCollision,
            player.snake.style.size
          );
          if (!isCollision) {
            this.isAlive = false;
            return;
          }
        });
      }
    });
  }

  checkDeath() {
    if (
      this.positionCollision.x <= 0 ||
      this.positionCollision.x >= GAME_WIDTH ||
      this.positionCollision.y <= 0 ||
      this.positionCollision.y >= GAME_WIDTH
    ) {
      this.isAlive = false;
    }
    this.checkSnakecollisionSnake();
  }

  dead() {
    for (let i = 0; i < this.tailPositions.length; i += 5) {
      const posTail = this.tailPositions[i];
      const sizeSnake = this.style.size;
      const _pos = {
        x: getRandomInteger(posTail.x, posTail.x + sizeSnake),
        y: getRandomInteger(posTail.y, posTail.y + sizeSnake),
      };
      const _color = COLORS[getRandomInteger(0, COLORS.length - 1)];
      const _size = getRandomInteger(5, 10);
      this.game.createOneFood(_pos, _color, _size);
    }
  }
}
