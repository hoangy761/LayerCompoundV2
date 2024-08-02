import { COLORS, GAME_WIDTH, INIT_FOODS_NUMBER } from '../constants';
import { CanvasNameEnum } from '../enums';
import { IDot, IPosition } from '../interfaces';
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
  createOneFood(pos: IPosition, color: string, size: number) {
    this.foods.push({ pos, color, size });
  }

  createFoods(_length: number) {
    for (let i = 0; i < _length; i++) {
      const pos = { x: getRandomInteger(0, GAME_WIDTH), y: getRandomInteger(0, GAME_WIDTH) };
      const color = COLORS[getRandomInteger(0, COLORS.length - 1)];
      const size = getRandomInteger(5, 10);
      this.createOneFood(pos, color, size);
    }
  }
  dead() {
    for (let i = 0; i < this.game.snakeInitAttributes.tailPositions.length; i += 5) {
      const posTail = this.game.snakeInitAttributes.tailPositions[i];
      const sizeSnake = this.game.snakeInitAttributes.style.size;
      const pos = {
        x: getRandomInteger(posTail.x, posTail.x + sizeSnake),
        y: getRandomInteger(posTail.y, posTail.y + sizeSnake),
      };
      const color = COLORS[getRandomInteger(0, COLORS.length - 1)];
      const size = getRandomInteger(5, 10);
      this.createOneFood(pos, color, size);
    }
  }
  newFoods() {
    setInterval(() => {
      if (this.foods.length < INIT_FOODS_NUMBER) {
        this.createFoods(INIT_FOODS_NUMBER - this.foods.length);
      }
    }, 10000);
  }
  checkSnakeEatFood() {
    for (let i = 0; i < this.foods.length; i++) {
      const isMatch = isEat(
        this.game.snake.position,
        this.game.snakeInitAttributes.style.size,
        this.game.snake.angle,
        this.foods[i].pos,
      );
      if (isMatch) {
        this.game.snake.growth(this.foods[i].size);
        this.foods.splice(i, 1);
      }
    }
  }
  drawFoods() {
    for (let i = 0; i < this.foods.length; i++) {
      if (this.game.ctx && this.game.ctxMiniMap) {
        drawDot(this.game, this.game.ctx, this.foods[i], CanvasNameEnum.GAME);
      }
    }
  }
  update() {
    this.checkSnakeEatFood();
    this.newFoods();
  }

  draw() {
    this.drawFoods();
  }
}
