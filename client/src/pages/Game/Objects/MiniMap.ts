import { StyleSnakeEnum } from '../enums';
import { Position } from '../interfaces';
import { drawCircle } from '../ultis';
import { Game } from './Game';

export class MiniMap {
  game: Game;
  snakePos: Position;
  constructor(_game: Game) {
    this.game = _game;
    this.snakePos = this.game.snake.position;
  }
  update() {
    this.snakePos = this.game.snake.position;
  }

  draw() {
    if (this.game.ctxMiniMap) {
      drawCircle(this.game, this.game.ctxMiniMap, this.snakePos, StyleSnakeEnum.POINT, 'miniMap');
    }
  }
}
