import { GAME_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { IPositionRectangle } from '../interfaces';
import { Game } from './Game';

export class Screen {
  game: Game;
  position: IPositionRectangle;
  constructor(_game: Game) {
    this.game = _game;
    this.position = {
      top: this.game.snake.position.y - SCREEN_WIDTH / 2,
      bottom: this.game.snake.position.y + SCREEN_WIDTH / 2,
      left: this.game.snake.position.x - SCREEN_WIDTH / 2,
      right: this.game.snake.position.x + SCREEN_WIDTH / 2,
    };
  }

  drawBoundary() {
    if (this.game.snake.position.y - SCREEN_HEIGHT / 2 <= 0) {
      this.game.barrier.drawLineTop(
        SCREEN_HEIGHT / 2 -
          this.game.snake.position.y -
          this.game.attributes.snake.style.size -
          this.game.attributes.snake.style.size / 2,
      );
    }

    if (this.game.snake.position.x - SCREEN_WIDTH / 2 <= 0) {
      this.game.barrier.drawLineLeft(SCREEN_WIDTH / 2 - this.game.snake.position.x);
    }
    if (this.game.snake.position.y + SCREEN_HEIGHT / 2 - GAME_WIDTH >= 0) {
      this.game.barrier.drawLineBottom(
        this.game.snake.position.y +
          SCREEN_HEIGHT / 2 -
          GAME_WIDTH +
          this.game.attributes.snake.style.size * 2 -
          this.game.attributes.snake.style.size / 2,
      );
    }
    if (this.game.snake.position.x + SCREEN_WIDTH / 2 - GAME_WIDTH >= 0) {
      this.game.barrier.drawLineRight(this.game.snake.position.x + SCREEN_WIDTH / 2 - GAME_WIDTH);
    }
  }
  update() {}

  draw() {
    this.drawBoundary();
  }
}
