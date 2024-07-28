import { EYE_ANGLE, EYE_DISTANCE, INIT_SNAKE_SIZE } from '../constants';
import { CanvasNameEnum, StyleSnakeEnum } from '../enums';
import { Position } from '../interfaces';
import { drawCircle, getPointOnCircumference } from '../ultis';
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

    if (this.snake.game.ctx) {
      drawCircle(this.snake.game, this.snake.game.ctx, scleraLeftPos, StyleSnakeEnum.SCLERA, CanvasNameEnum.GAME);
      drawCircle(this.snake.game, this.snake.game.ctx, scleraRightPos, StyleSnakeEnum.SCLERA, CanvasNameEnum.GAME);
      drawCircle(this.snake.game, this.snake.game.ctx, eyeLeftPos, StyleSnakeEnum.EYE, CanvasNameEnum.GAME);
      drawCircle(this.snake.game, this.snake.game.ctx, eyeRightPos, StyleSnakeEnum.EYE, CanvasNameEnum.GAME);
    }
  }
}
