import { CanvasNameEnum } from '../enums';
import { drawDot } from '../ultis';
import { Game } from './Game';

export class MiniMap {
  game: Game;
  constructor(_game: Game) {
    this.game = _game;
  }
  update() {}

  draw() {
    if (this.game.ctxMiniMap) {
      for (let i = 0; i < this.game.food.foods.length; i++) {
        drawDot(this.game, this.game.ctxMiniMap, this.game.food.foods[i], CanvasNameEnum.MINI_MAP);
      }
      drawDot(
        this.game,
        this.game.ctxMiniMap,
        { color: 'black', pos: this.game.snake.position, size: this.game.snakeInitAttributes.style.size / 2 },
        CanvasNameEnum.MINI_MAP,
      );
    }
  }
}
