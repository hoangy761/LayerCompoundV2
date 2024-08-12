import { EYE_ANGLE, EYE_DISTANCE } from '../constants';
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
      this.snake.game.attributes.snake.style.size / 1.3,
      this.snake.angle - EYE_ANGLE,
    );
    const scleraRightPos: IPosition = getPointOnCircumference(
      this.snake.position,
      this.snake.game.attributes.snake.style.size / 1.3,
      this.snake.angle + EYE_ANGLE,
    );

    if (this.snake.game.ctx) {
      drawDot(
        this.snake.game,
        this.snake.game.ctx,
        { color: 'white', pos: scleraLeftPos, size: this.snake.game.attributes.snake.style.size / 2 },
        CanvasNameEnum.GAME,
      );
      drawDot(
        this.snake.game,
        this.snake.game.ctx,
        { color: 'white', pos: scleraRightPos, size: this.snake.game.attributes.snake.style.size / 2 },
        CanvasNameEnum.GAME,
      );

      drawDot(
        this.snake.game,
        this.snake.game.ctx,
        { color: 'black', pos: eyeLeftPos, size: this.snake.game.attributes.snake.style.size / 4 },
        CanvasNameEnum.GAME,
      );

      drawDot(
        this.snake.game,
        this.snake.game.ctx,
        { color: 'black', pos: eyeRightPos, size: this.snake.game.attributes.snake.style.size / 4 },
        CanvasNameEnum.GAME,
      );
    }
  }

  drawOtherSnake() {
    this.snake.game.attributesOtherSnake.forEach((player) => {
      const eyeLeftPos: IPosition = getPointOnCircumference(
        player.snake.position,
        EYE_DISTANCE * 1.3,
        player.snake.angle - EYE_ANGLE + 0.25,
      );

      const eyeRightPos: IPosition = getPointOnCircumference(
        player.snake.position,
        EYE_DISTANCE * 1.3,
        player.snake.angle + EYE_ANGLE - 0.25,
      );

      const scleraLeftPos: IPosition = getPointOnCircumference(
        player.snake.position,
        player.snake.style.size / 1.3,
        player.snake.angle - EYE_ANGLE,
      );
      const scleraRightPos: IPosition = getPointOnCircumference(
        player.snake.position,
        player.snake.style.size / 1.3,
        player.snake.angle + EYE_ANGLE,
      );

      if (this.snake.game.ctx) {
        drawDot(
          this.snake.game,
          this.snake.game.ctx,
          { color: 'white', pos: scleraLeftPos, size: player.snake.style.size / 2 },
          CanvasNameEnum.GAME,
        );
        drawDot(
          this.snake.game,
          this.snake.game.ctx,
          { color: 'white', pos: scleraRightPos, size: player.snake.style.size / 2 },
          CanvasNameEnum.GAME,
        );

        drawDot(
          this.snake.game,
          this.snake.game.ctx,
          { color: 'black', pos: eyeLeftPos, size: player.snake.style.size / 4 },
          CanvasNameEnum.GAME,
        );

        drawDot(
          this.snake.game,
          this.snake.game.ctx,
          { color: 'black', pos: eyeRightPos, size: player.snake.style.size / 4 },
          CanvasNameEnum.GAME,
        );
      }
    });
  }
}
