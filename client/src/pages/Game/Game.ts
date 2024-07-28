/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Background } from './Background';
import { Barrier } from './Barrier';
import { GAME_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants';
import { Screen } from './Screen';
import { Snake } from './Snake';

export class Game {
  ctx: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement | null;
  snake: Snake;
  screen: Screen;
  background: Background;
  barrier: Barrier;

  constructor(_canvas: HTMLCanvasElement) {
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_WIDTH;

    //snake
    this.snake = new Snake(this);
    this.screen = new Screen(this);
    this.background = new Background(this);
    this.barrier = new Barrier(this);

    this.loop();
  }

  loop() {
    this.update();
    this.draw();
    setTimeout(() => {
      this.loop();
    }, 30);
  }

  clearScreen() {
    if (this.ctx) {
      this.ctx.fillStyle = '#f1f2f2';
      this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
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
    this.screen.update();
  }
}
