import { GAME_WIDTH, MINI_MAP_GAME_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { IDot, IPlayer } from '../interfaces';
import { Snake } from './Snake';
import { Screen } from './Screen';
import { Barrier } from './Barrier';
import { Background } from './Background';
import { Food } from './Food';
import { MiniMap } from './MiniMap';

export class Game {
  ctx: CanvasRenderingContext2D | null;
  ctxMiniMap: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement;
  canvasMiniMap: HTMLCanvasElement | null;

  foods: IDot[];

  attributes: IPlayer;
  attributesOtherSnake: IPlayer[];
  snake: Snake;
  screen: Screen;
  barrier: Barrier;
  background: Background;
  food: Food;
  miniMap: MiniMap;

  constructor(
    _canvas: HTMLCanvasElement,
    _canvasMiniMap: HTMLCanvasElement,
    _food: IDot[],
    mySnake: IPlayer,
    otherSnakes: IPlayer[],
  ) {
    this.canvas = _canvas;
    this.canvasMiniMap = _canvasMiniMap;
    this.ctx = this.canvas.getContext('2d');
    this.ctxMiniMap = this.canvasMiniMap.getContext('2d');
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_WIDTH;

    //snake
    this.attributes = mySnake;
    this.attributesOtherSnake = otherSnakes;
    this.snake = new Snake(this);

    //screen
    this.screen = new Screen(this);

    //barrier
    this.barrier = new Barrier(this);

    //background
    this.background = new Background(this);

    //food
    this.foods = _food;
    this.food = new Food(this);

    //miniMap
    this.miniMap = new MiniMap(this);
  }

  start() {
    this.update();
    this.draw();
  }

  clearScreen() {
    if (this.ctx && this.ctxMiniMap) {
      //clear Screen background
      this.ctx.fillStyle = '#f1f2f2';
      this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

      //clear miniMap background
      this.ctxMiniMap.fillStyle = 'rgba(174, 174, 174, 0.5)';
      this.ctxMiniMap.fillRect(0, 0, MINI_MAP_GAME_WIDTH, MINI_MAP_GAME_WIDTH);
    }
  }

  clearGameBackground() {
    if (this.ctx && this.ctxMiniMap) {
      //clear Game background x
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(SCREEN_WIDTH, 0, GAME_WIDTH - SCREEN_WIDTH, SCREEN_HEIGHT);

      //clear Game background y
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, SCREEN_HEIGHT, GAME_WIDTH, GAME_WIDTH - SCREEN_HEIGHT);
    }
  }

  update() {
    // this.background.update();
    // this.miniMap.update();
    // this.food.update();
    // this.snake.update();
    // this.screen.update();
  }

  draw() {
    this.clearScreen();
    this.clearGameBackground();
    this.background.draw();
    this.screen.draw();
    this.food.draw();
    this.snake.draw();
    this.miniMap.draw();
  }
}
