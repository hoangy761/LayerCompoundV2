/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GAME_WIDTH, INIT_SNAKE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants';
import { StyleSnakeEnum } from './enums';
import { Game } from './Game';
import { Position, PositionRectangle, stylesSnake } from './interfaces';

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
    console.log(this.position);

    if (this.position.top - SCREEN_HEIGHT / 2 <= 0) {
      this.game.barrier.drawLineTop(SCREEN_HEIGHT / 2 - this.position.top);
    }
    if (this.position.left - SCREEN_WIDTH / 2 <= 0) {
      this.game.barrier.drawLineLeft(SCREEN_WIDTH / 2 - this.position.left);
    }
    if (this.position.bottom + SCREEN_HEIGHT / 2 - GAME_WIDTH >= 0) {
      this.game.barrier.drawLineBottom(this.position.bottom + SCREEN_HEIGHT / 2 - GAME_WIDTH);
    }
    if (this.position.right + SCREEN_WIDTH / 2 - GAME_WIDTH >= 0) {
      this.game.barrier.drawLineRight(this.position.right + SCREEN_WIDTH / 2 - GAME_WIDTH);
    }

    if (this.position.top + INIT_SNAKE_SIZE / 2 <= 0) {
      return true;
    }
    return false;
  }

  drawCircle(pos: Position, styleName: StyleSnakeEnum) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const styles: stylesSnake = {};
    styles[StyleSnakeEnum.SNAKE] = {
      color: 'red',
      borderColor: 'green',
      width: INIT_SNAKE_SIZE,
    };
    // styles[StyleSnakeEnum.EYE] = {
    //   color: 'red',
    //   borderColor: 'green',
    //   width: 10,
    // };

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
      this.game.ctx.strokeStyle = styleProperties.borderColor;
      this.game.ctx.stroke();
    }
  }
  draw() {}
}
