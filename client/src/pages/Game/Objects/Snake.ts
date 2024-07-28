import { GAME_WIDTH, INIT_SNAKE_LENGHT, INIT_SNAKE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH, SNAKE_SPEED } from '../constants';
import { CanvasNameEnum, StyleSnakeEnum } from '../enums';
import { Eye } from './Eye';
import { Game } from './Game';
import { Position } from '../interfaces';
import { drawCircle, getPointOnCircumference } from '../ultis';

export class Snake {
  game: Game;
  eye: Eye;
  position: Position;
  positionCollision: Position;
  angle: number;
  tailPositions: Position[];
  constructor(_game: Game) {
    this.game = _game;
    this.position = { x: GAME_WIDTH / 2, y: GAME_WIDTH / 2 };
    this.positionCollision = { x: this.position.x + INIT_SNAKE_SIZE, y: this.position.y };
    this.eye = new Eye(this);
    this.angle = 0;
    this.tailPositions = [];

    this.createTail(INIT_SNAKE_LENGHT);

    this.listenMouseEvent();
  }
  initSnake() {
    this.position = { x: GAME_WIDTH / 2, y: GAME_WIDTH / 2 };
    this.positionCollision = { x: this.position.x + INIT_SNAKE_SIZE, y: this.position.y };
    this.createTail(INIT_SNAKE_LENGHT);
  }

  listenMouseEvent() {
    if (this.game.canvas) {
      this.game.canvas.addEventListener('mousemove', (event: MouseEvent) => {
        const rect = this.game.canvas?.getBoundingClientRect();
        if (!rect) return { x: 0, y: 0 };
        this.processMouseMove({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      });
    }
  }
  processMouseMove(mousePos: Position) {
    this.angle = Math.atan2(mousePos.y - SCREEN_HEIGHT / 2, mousePos.x - SCREEN_WIDTH / 2);
  }

  createTail(initLenght: number) {
    //init lenght Snake
    for (let index = 0; index < initLenght; index++) {
      this.tailPositions.push({ x: this.position.x - SNAKE_SPEED * index, y: this.position.y });
    }
  }
  update() {
    // cos = ke / huyen => k = cos * h
    // this.position.x += Math.cos(this.angle) * SNAKE_SPEED;
    // this.position.y += Math.sin(this.angle) * SNAKE_SPEED;

    const newTailPosition = {
      x: this.position.x + Math.cos(this.angle) * SNAKE_SPEED,
      y: this.position.y + Math.sin(this.angle) * SNAKE_SPEED,
    };
    this.tailPositions.unshift(newTailPosition);
    this.tailPositions.pop();

    this.position = newTailPosition;
    this.positionCollision = getPointOnCircumference(this.position, INIT_SNAKE_SIZE, this.angle);
  }
  draw() {
    //draw shadow
    for (let index = this.tailPositions.length - 1; index >= 1; index--) {
      if (this.game.ctx) {
        drawCircle(
          this.game,
          this.game.ctx,
          { x: this.tailPositions[index].x, y: this.tailPositions[index].y },
          StyleSnakeEnum.SHADOW,
          CanvasNameEnum.GAME,
        );
      }
    }

    //draw body
    for (let index = this.tailPositions.length - 1; index >= 0; index -= 3) {
      if (this.game.ctx) {
        drawCircle(
          this.game,
          this.game.ctx,
          { x: this.tailPositions[index].x, y: this.tailPositions[index].y },
          StyleSnakeEnum.SNAKE,
          CanvasNameEnum.GAME,
        );
      }
    }

    //draw head
    //draw eyes
    this.eye.draw();
  }
}
