import { GAME_WIDTH, SCREEN_WIDTH } from './constants';
import { Game } from './Game';
import { Position } from './interfaces';

export class Snake {
  game: Game;
  position: Position;
  angle: number;
  constructor(_game: Game) {
    this.game = _game;
    this.position = { x: GAME_WIDTH / 2, y: GAME_WIDTH / 2 };

    this.angle = 0;

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
    this.angle = Math.atan2(mousePos.y - SCREEN_WIDTH / 2, mousePos.x - SCREEN_WIDTH / 2);
    console.log(this.angle);
  }
  update() {}
  draw() {
    this.game.screen.drawCircle({ x: this.position.x, y: this.position.y });
  }
}
