/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GAME_WIDTH, SCREEN_WIDTH } from './constants';
import { Game } from './Game';
import { Position, PositionRectangle } from './interfaces';

export class Screen {
  game: Game;
  position: PositionRectangle;
  constructor(_game: Game) {
    this.game = _game;
    this.position = { top: 0, bottom: 0, right: 0, left: 0 };
  }

  update() {
    this.position.top = this.game.snake.position.y - SCREEN_WIDTH / 2;
    this.position.bottom = this.game.snake.position.y + SCREEN_WIDTH / 2;
    this.position.left = this.game.snake.position.x - SCREEN_WIDTH / 2;
    this.position.right = this.game.snake.position.x + SCREEN_WIDTH / 2;
  }

  drawCircle(pos: Position) {
    if (this.game.ctx) {
      this.game.ctx.beginPath();
      this.game.ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
      this.game.ctx.fillStyle = 'green';
      this.game.ctx.fill();
    }
  }
  draw() {}
}
