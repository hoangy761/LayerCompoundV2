/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { GAME_WIDTH, INIT_SNAKE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { StyleSnakeEnum } from '../enums';
import { Position, PositionRectangle, stylesSnake } from '../interfaces';
import { isConllision } from '../ultis';
import { Game } from './Game';

export class Screen {
  game: Game;
  position: PositionRectangle;
  constructor(_game: Game) {
    this.game = _game;
    this.position = { top: 1, bottom: 1, right: 1, left: 1 };
  }

  update() {
    this.position.top = this.game.snake.position.y - SCREEN_WIDTH / 2;
    this.position.bottom = this.game.snake.position.y + SCREEN_WIDTH / 2;
    this.position.left = this.game.snake.position.x - SCREEN_WIDTH / 2;
    this.position.right = this.game.snake.position.x + SCREEN_WIDTH / 2;

    if (this.game.snake.positionCollision.y - SCREEN_HEIGHT / 2 <= 0) {
      this.game.barrier.drawLineTop(SCREEN_HEIGHT / 2 - this.game.snake.positionCollision.y - 2 * INIT_SNAKE_SIZE);
    }

    if (this.game.snake.positionCollision.x - SCREEN_WIDTH / 2 <= 0) {
      this.game.barrier.drawLineLeft(SCREEN_WIDTH / 2 - this.game.snake.positionCollision.x);
    }
    if (this.game.snake.positionCollision.y + SCREEN_HEIGHT / 2 - GAME_WIDTH >= 0) {
      this.game.barrier.drawLineBottom(
        this.game.snake.positionCollision.y +
          SCREEN_HEIGHT / 2 -
          GAME_WIDTH +
          INIT_SNAKE_SIZE * 2 -
          INIT_SNAKE_SIZE / 2,
      );
    }
    if (this.game.snake.positionCollision.x + SCREEN_WIDTH / 2 - GAME_WIDTH >= 0) {
      this.game.barrier.drawLineRight(this.game.snake.positionCollision.x + SCREEN_WIDTH / 2 - GAME_WIDTH);
    }
  }

  drawCircle(pos: Position, styleName: StyleSnakeEnum) {
    const styles: stylesSnake = {};
    styles[StyleSnakeEnum.SNAKE] = {
      color: 'red',
      borderColor: 'green',
      width: INIT_SNAKE_SIZE,
    };
    styles[StyleSnakeEnum.SHADOW] = {
      color: 'rgba(0,0,0,0.1)',
      borderColor: 'rgba(0,0,0,0.1)',
      width: INIT_SNAKE_SIZE + INIT_SNAKE_SIZE / 9,
    };
    styles[StyleSnakeEnum.EYE] = {
      color: 'black',
      width: INIT_SNAKE_SIZE / 4,
    };
    styles[StyleSnakeEnum.SCLERA] = {
      color: 'white',
      width: INIT_SNAKE_SIZE / 2,
    };

    const styleProperties = styles[styleName];

    if (this.game.ctx) {
      this.game.ctx.beginPath();
      // this.game.ctx.arc(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 10, 0, Math.PI * 2);
      this.game.ctx.arc(
        pos.x - this.position.left,
        pos.y - this.position.top - SCREEN_WIDTH / 4,
        styleProperties.width,
        0,
        Math.PI * 2,
      );
      this.game.ctx.fillStyle = styleProperties.color;
      this.game.ctx.fill();
      styleProperties.borderColor ? (this.game.ctx.strokeStyle = styleProperties.borderColor) : '';
      this.game.ctx.stroke();
    }
  }
  draw() {}
}
