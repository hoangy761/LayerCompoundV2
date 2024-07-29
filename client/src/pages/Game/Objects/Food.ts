import { GAME_WIDTH, INIT_FOODS_NUMBER, INIT_SNAKE_SIZE } from '../constants';
import { CanvasNameEnum } from '../enums';
import { IDot } from '../interfaces';
import { drawDot, getRandomInteger, isEat } from '../ultis';
import { Game } from './Game';

export class Food {
  game: Game;
  foods: IDot[];
  constructor(_game: Game) {
    this.game = _game;
    this.foods = [];
    this.createFoods(INIT_FOODS_NUMBER);
  }

  createFoods(_lenght: number) {
    const colors = [
      '#7C00FE',
      '#F9E400',
      '#FFAF00',
      '#F5004F',
      '#FFB200',
      '#E4003A',
      '#EECEB9',
      '#FEFBD8',
      '#E8DFCA',
      '#1A4D2E',
    ];
    for (let i = 0; i < _lenght; i++) {
      const pos = { x: getRandomInteger(0, GAME_WIDTH), y: getRandomInteger(0, GAME_WIDTH) };
      const color = colors[getRandomInteger(0, colors.length - 1)];
      const size = getRandomInteger(5, 10);
      this.foods.push({ pos, color, size });
    }
  }

  update() {
    for (let i = 0; i < this.foods.length; i++) {
      const isMatch = isEat(this.game.snake.position, INIT_SNAKE_SIZE, this.game.snake.angle, this.foods[i].pos);
      if (isMatch) {
        this.foods.splice(i, 1);
      }
    }
    setTimeout(() => {
      if (this.foods.length < INIT_FOODS_NUMBER) {
        this.createFoods(INIT_FOODS_NUMBER - this.foods.length);
      }
    }, 10000);
  }
  draw() {
    for (let i = 0; i < this.foods.length; i++) {
      if (this.game.ctx && this.game.ctxMiniMap) {
        drawDot(this.game, this.game.ctx, this.foods[i], CanvasNameEnum.GAME);
      }
    }
  }
}
