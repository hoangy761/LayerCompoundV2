import { GAME_WIDTH, INIT_SNAKE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { IPositionRectangle } from '../interfaces';
import { Game } from './Game';

export class Screen {
  game: Game;
  position: IPositionRectangle;
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

  draw() {}
}
