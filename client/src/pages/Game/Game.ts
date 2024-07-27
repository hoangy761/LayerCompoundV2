/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Background } from './Background';
import { GAME_WIDTH, SCREEN_WIDTH } from './constants';
import { Screen } from './Screen';
import { Snake } from './Snake';

export class Game {
  ctx: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement | null;
  snake: Snake;
  screen: Screen;
  background: Background;

  constructor(_canvas: HTMLCanvasElement) {
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_WIDTH;

    //snake
    this.snake = new Snake(this);
    this.screen = new Screen(this);
    this.background = new Background(this);
    this.loop();
  }

  loop() {
    this.update();
    this.draw();
    setTimeout(() => {
      this.loop();
    }, 10000);
  }

  clearScreen() {
    if (this.ctx) {
      this.ctx.fillStyle = '#f1f2f2';
      this.ctx.fillRect(
        this.snake.position.x - SCREEN_WIDTH / 2,
        this.snake.position.y - SCREEN_WIDTH / 2,
        SCREEN_WIDTH,
        SCREEN_WIDTH,
      );
    }
  }

  update() {
    this.snake.update();
    this.background.update();
    this.screen.update();
  }

  draw() {
    this.clearScreen();
    this.background.draw();
    this.snake.draw();
  }
}
