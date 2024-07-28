import { GAME_WIDTH, INIT_SNAKE_LENGHT, SCREEN_HEIGHT, SCREEN_WIDTH, SNAKE_SPEED } from './constants';
import { StyleSnakeEnum } from './enums';
import { Game } from './Game';
import { Position } from './interfaces';

export class Snake {
  game: Game;
  position: Position;
  angle: number;
  tailPositions: Position[];
  constructor(_game: Game) {
    this.game = _game;
    this.position = { x: GAME_WIDTH / 2, y: GAME_WIDTH / 2 };

    this.angle = 0;
    this.tailPositions = [];

    this.createTail(INIT_SNAKE_LENGHT);

    this.listenMouseEvent();
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
  }
  draw() {
    for (let index = this.tailPositions.length - 1; index >= 0; index -= 3) {
      this.game.screen.drawCircle(
        { x: this.tailPositions[index].x, y: this.tailPositions[index].y },
        StyleSnakeEnum.SNAKE,
      );
    }
  }
}
