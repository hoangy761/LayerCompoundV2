import { CanvasNameEnum, StyleSnakeEnum } from '../enums';
import { drawCircle } from '../ultis';
import { Game } from './Game';

export class MiniMap {
  game: Game;
  constructor(_game: Game) {
    this.game = _game;
  }
  update() {}

  draw() {
    if (this.game.ctxMiniMap) {
      drawCircle(
        this.game,
        this.game.ctxMiniMap,
        this.game.snake.position,
        StyleSnakeEnum.POINT,
        CanvasNameEnum.MINI_MAP,
      );
    }
  }
}
