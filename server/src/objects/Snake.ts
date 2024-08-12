import { IDot, IPosition, ISnake, IStyle } from "../interfaces";

export class Snake {
  angle: number;
  tailPositions: IPosition[];
  speed: number;
  isAlive: boolean;
  position: IPosition;
  positionCollision: IPosition;
  style: IStyle;
  styleShadow: IStyle;
  constructor(_snake: ISnake) {
    this.angle = _snake.angle;
    this.tailPositions = _snake.tailPositions;
    this.speed = _snake.speed;
    this.isAlive = _snake.isAlive;
    this.position = _snake.position;
    this.positionCollision = _snake.positionCollision;
    this.style = _snake.style;
    this.styleShadow = _snake.styleShadow;
  }

  update() {}
  run() {}
}
