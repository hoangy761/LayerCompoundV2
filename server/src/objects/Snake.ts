import { IDot, IPosition, ISnake, IStyle } from "../interfaces";
import { isEat } from "../utils/game/position";

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

  run() {
    const newTailPosition = {
      x: this.position.x + Math.cos(this.angle) * this.speed,
      y: this.position.y + Math.sin(this.angle) * this.speed,
    };
    this.tailPositions.unshift(newTailPosition);
    this.tailPositions.pop();
    this.position = newTailPosition;
  }

  eat(_foods: IDot[]) {
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
  }
}
