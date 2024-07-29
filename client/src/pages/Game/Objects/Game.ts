import { Background } from './Background';
import { Barrier } from './Barrier';
import { GAME_WIDTH, MINI_MAP_GAME_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { Snake } from './Snake';
import { Screen } from './Screen';
import { isConllision } from '../ultis';
import { MiniMap } from './MiniMap';
import { Food } from './Food';

export class Game {
  ctx: CanvasRenderingContext2D | null;
  ctxMiniMap: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement | null;
  canvasMiniMap: HTMLCanvasElement | null;
  snake: Snake;
  screen: Screen;
  background: Background;
  barrier: Barrier;
  miniMap: MiniMap;
  food: Food;

  constructor(_canvas: HTMLCanvasElement, _canvasMiniMap: HTMLCanvasElement) {
    this.canvas = _canvas;
    this.canvasMiniMap = _canvasMiniMap;
    this.ctx = this.canvas.getContext('2d');
    this.ctxMiniMap = this.canvasMiniMap.getContext('2d');
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_WIDTH;

    //snake
    this.snake = new Snake(this);
    //screen
    this.screen = new Screen(this);
    //background
    this.background = new Background(this);
    //barrier
    this.barrier = new Barrier(this);
    //miniMap
    this.miniMap = new MiniMap(this);
    //food
    this.food = new Food(this);

    this.loop();
    this.food.draw();
  }

  loop() {
    this.update();
    this.draw();
    if (isConllision(this.snake.positionCollision, GAME_WIDTH, GAME_WIDTH)) {
      window.alert('chạm vào vùng FreeFire rôi =((');
      this.snake.initSnake();
    }
    setTimeout(() => {
      this.loop();
    }, 50);
  }

  clearScreen() {
    if (this.ctx && this.ctxMiniMap) {
      this.ctx.fillStyle = '#f1f2f2';
      this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

      this.ctxMiniMap.fillStyle = 'green';
      this.ctxMiniMap.fillRect(0, 0, MINI_MAP_GAME_WIDTH, MINI_MAP_GAME_WIDTH);
    }
  }

  update() {
    this.background.update();
    this.miniMap.update();
    this.food.update();
    this.snake.update();
    this.screen.update();
  }

  draw() {
    this.clearScreen();
    this.background.draw();
    this.miniMap.draw();
    this.food.draw();
    this.snake.draw();
    this.screen.update();
  }
}
