import { GAME_WIDTH, INIT_FOODS_NUMBER } from '../constants';
import { CanvasNameEnum } from '../enums';
import { Dot } from '../interfaces';
import { drawDot, getRandomInteger } from '../ultis';
import { Game } from './Game';

export class Food {
  game: Game;
  foods: Dot[];
  constructor(_game: Game) {
    this.game = _game;
    this.foods = this.createFoods(INIT_FOODS_NUMBER);
  }

  createFoods(_lenght: number): Dot[] {
    const initFoods: Dot[] = [];
    const colors = ['red', 'green', 'red', 'green', 'red', 'green', 'red', 'green', 'red', 'green'];
    for (let i = 0; i < _lenght; i++) {
      const pos = { x: getRandomInteger(0, GAME_WIDTH), y: getRandomInteger(0, GAME_WIDTH) };
      const color = colors[getRandomInteger(0, colors.length - 1)];
      const size = getRandomInteger(5, 10);
      initFoods.push({ pos, color, size });
    }
    return initFoods;
  }

  update() {}
  draw() {
    for (let i = 0; i < this.foods.length; i++) {
      if (this.game.ctx && this.game.ctxMiniMap) {
        drawDot(this.game, this.game.ctx, this.foods[i], CanvasNameEnum.GAME);
        // drawDot(this.game, this.game.ctxMiniMap, this.foods[i], CanvasNameEnum.MINI_MAP);
      }
    }
    for (let i = 0; i < this.foods.length; i++) {
      if (this.game.ctx && this.game.ctxMiniMap) {
        // drawDot(this.game, this.game.ctx, this.foods[i], CanvasNameEnum.GAME);
        drawDot(this.game, this.game.ctxMiniMap, this.foods[i], CanvasNameEnum.MINI_MAP);
      }
    }
    // if (this.game.ctx && this.game.ctxMiniMap) {
    //   drawDot(this.game, this.game.ctx, this.foods[1], CanvasNameEnum.GAME);
    //   drawDot(this.game, this.game.ctxMiniMap, this.foods[1], CanvasNameEnum.MINI_MAP);
    // }
  }
}
