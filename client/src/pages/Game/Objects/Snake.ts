import { GAME_WIDTH, INIT_SNAKE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH, SNAKE_SPEED } from '../constants';
import { CanvasNameEnum } from '../enums';
import { Eye } from './Eye';
import { Game } from './Game';
import { IPosition } from '../interfaces';
import { drawDot, getPointOnCircumference, getRandomInteger } from '../ultis';

export class Snake {
  game: Game;
  eye: Eye;
  position: IPosition;
  angle: number;
  constructor(_game: Game) {
    this.game = _game;
    this.position = {
      x: getRandomInteger(SCREEN_WIDTH / 2, GAME_WIDTH - SCREEN_WIDTH / 2),
      y: getRandomInteger(SCREEN_HEIGHT / 2, GAME_WIDTH - SCREEN_HEIGHT / 2),
    };
    this.game.snakeInitAttributes.positionCollision = { x: this.position.x + INIT_SNAKE_SIZE, y: this.position.y };
    this.eye = new Eye(this);
    this.angle = 0;

    this.createTail(this.game.snakeInitAttributes.length);

    this.listenMouseEvent();
  }
  initSnake() {
    this.game.snakeInitAttributes.tailPositions = [];
    this.position = {
      x: getRandomInteger(SCREEN_WIDTH / 2, GAME_WIDTH - SCREEN_WIDTH / 2),
      y: getRandomInteger(SCREEN_HEIGHT / 2, GAME_WIDTH - SCREEN_HEIGHT / 2),
    };
    this.game.snakeInitAttributes.positionCollision = { x: this.position.x + INIT_SNAKE_SIZE, y: this.position.y };
    this.createTail(this.game.snakeInitAttributes.length);
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
  processMouseMove(mousePos: IPosition) {
    this.angle = Math.atan2(mousePos.y - SCREEN_HEIGHT / 2, mousePos.x - SCREEN_WIDTH / 2);
  }

  createTail(initLenght: number) {
    for (let index = 0; index < initLenght; index++) {
      this.game.snakeInitAttributes.tailPositions.push({
        x: this.position.x - SNAKE_SPEED * index,
        y: this.position.y,
      });
    }
  }
  growth(numberCalo: number) {
    for (let i = 0; i < numberCalo; i++) {
      const newTailPosition = {
        x: this.position.x + Math.cos(this.angle) * this.game.snakeInitAttributes.speed,
        y: this.position.y + Math.sin(this.angle) * this.game.snakeInitAttributes.speed,
      };
      this.game.snakeInitAttributes.tailPositions.unshift(newTailPosition);
      this.position = newTailPosition;
    }
  }
  update() {
    // cos = ke / huyen => k = cos * h
    // this.position.x += Math.cos(this.angle) * SNAKE_SPEED;
    // this.position.y += Math.sin(this.angle) * SNAKE_SPEED;

    // const newTailPosition = {
    //   x: this.position.x + Math.cos(this.angle) * this.game.snakeInitAttributes.speed,
    //   y: this.position.y + Math.sin(this.angle) * this.game.snakeInitAttributes.speed,
    // };
    // this.game.snakeInitAttributes.tailPositions.unshift(newTailPosition);
    this.growth(1);
    this.game.snakeInitAttributes.tailPositions.pop();

    this.game.snakeInitAttributes.positionCollision = getPointOnCircumference(
      this.position,
      INIT_SNAKE_SIZE,
      this.angle,
    );
  }
  draw() {
    //draw shadow
    for (let index = this.game.snakeInitAttributes.tailPositions.length - 1; index >= 1; index--) {
      if (this.game.ctx) {
        drawDot(
          this.game,
          this.game.ctx,
          {
            color: this.game.snakeInitAttributes.styleShadow.color,
            pos: {
              x: this.game.snakeInitAttributes.tailPositions[index].x,
              y: this.game.snakeInitAttributes.tailPositions[index].y,
            },
            size: this.game.snakeInitAttributes.styleShadow.size,
            borderColor: this.game.snakeInitAttributes.styleShadow.borderColor,
          },
          CanvasNameEnum.GAME,
        );
      }
    }

    //draw body
    for (let index = this.game.snakeInitAttributes.tailPositions.length - 1; index >= 0; index -= 3) {
      if (this.game.ctx) {
        drawDot(
          this.game,
          this.game.ctx,
          {
            color: this.game.snakeInitAttributes.style.color,
            pos: {
              x: this.game.snakeInitAttributes.tailPositions[index].x,
              y: this.game.snakeInitAttributes.tailPositions[index].y,
            },
            size: this.game.snakeInitAttributes.style.size,
            borderColor: this.game.snakeInitAttributes.style.borderColor,
          },
          CanvasNameEnum.GAME,
        );
      }
    }

    //draw head
    //draw eyes
    this.eye.draw();
  }
}
