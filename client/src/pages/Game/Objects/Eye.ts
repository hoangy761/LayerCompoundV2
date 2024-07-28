import { EYE_ANGLE, EYE_DISTANCE, INIT_SNAKE_SIZE } from '../constants';
import { StyleSnakeEnum } from '../enums';
import { Position } from '../interfaces';
import { getPointOnCircumference } from '../ultis';
import { Snake } from './Snake';

export class Eye {
  snake: Snake;
  constructor(_snake: Snake) {
    this.snake = _snake;
  }

  update() {}
  draw() {
    const eyeLeftPos: Position = getPointOnCircumference(
      this.snake.position,
      EYE_DISTANCE * 1.3,
      this.snake.angle - EYE_ANGLE + 0.25,
    );

    const eyeRightPos: Position = getPointOnCircumference(
      this.snake.position,
      EYE_DISTANCE * 1.3,
      this.snake.angle + EYE_ANGLE - 0.25,
    );

    const scleraLeftPos: Position = getPointOnCircumference(
      this.snake.position,
      INIT_SNAKE_SIZE / 1.3,
      this.snake.angle - EYE_ANGLE,
    );
    const scleraRightPos: Position = getPointOnCircumference(
      this.snake.position,
      INIT_SNAKE_SIZE / 1.3,
      this.snake.angle + EYE_ANGLE,
    );

    // const eyeCenter: Position = {
    //   x: this.snake.positionCollision.x,
    //   y: this.snake.positionCollision.y,
    // };

    this.snake.game.screen.drawCircle(scleraLeftPos, StyleSnakeEnum.SCLERA);
    this.snake.game.screen.drawCircle(scleraRightPos, StyleSnakeEnum.SCLERA);
    this.snake.game.screen.drawCircle(eyeLeftPos, StyleSnakeEnum.EYE);
    this.snake.game.screen.drawCircle(eyeRightPos, StyleSnakeEnum.EYE);
    // this.snake.game.screen.drawCircle(eyeCenter, StyleSnakeEnum.EYE);
  }
}
