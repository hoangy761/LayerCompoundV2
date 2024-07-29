import { EYE_ANGLE, EYE_DISTANCE, INIT_SNAKE_SIZE } from '../constants';
import { CanvasNameEnum } from '../enums';
import { IPosition } from '../interfaces';
import { drawDot, getPointOnCircumference } from '../ultis';
import { Snake } from './Snake';

export class Eye {
  snake: Snake;
  constructor(_snake: Snake) {
    this.snake = _snake;
  }

  update() {}
  draw() {
    const eyeLeftPos: IPosition = getPointOnCircumference(
      this.snake.position,
      EYE_DISTANCE * 1.3,
      this.snake.angle - EYE_ANGLE + 0.25,
    );

    const eyeRightPos: IPosition = getPointOnCircumference(
      this.snake.position,
      EYE_DISTANCE * 1.3,
      this.snake.angle + EYE_ANGLE - 0.25,
    );

    const scleraLeftPos: IPosition = getPointOnCircumference(
      this.snake.position,
      INIT_SNAKE_SIZE / 1.3,
      this.snake.angle - EYE_ANGLE,
    );
    const scleraRightPos: IPosition = getPointOnCircumference(
      this.snake.position,
      INIT_SNAKE_SIZE / 1.3,
      this.snake.angle + EYE_ANGLE,
    );

    if (this.snake.game.ctx) {
      drawDot(
        this.snake.game,
        this.snake.game.ctx,
        { color: 'white', pos: scleraLeftPos, size: INIT_SNAKE_SIZE / 2 },
        CanvasNameEnum.GAME,
      );
      drawDot(
        this.snake.game,
        this.snake.game.ctx,
        { color: 'white', pos: scleraRightPos, size: INIT_SNAKE_SIZE / 2 },
        CanvasNameEnum.GAME,
      );

      drawDot(
        this.snake.game,
        this.snake.game.ctx,
        { color: 'black', pos: eyeLeftPos, size: INIT_SNAKE_SIZE / 4 },
        CanvasNameEnum.GAME,
      );

      drawDot(
        this.snake.game,
        this.snake.game.ctx,
        { color: 'black', pos: eyeRightPos, size: INIT_SNAKE_SIZE / 4 },
        CanvasNameEnum.GAME,
      );
    }
  }
}
