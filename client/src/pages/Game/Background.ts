import { GRID_SIZE, SCREEN_WIDTH } from './constants';
import { Game } from './Game';
import { Position } from './interfaces';

export class Background {
  game: Game;
  constructor(_game: Game) {
    this.game = _game;
  }
  update() {}
  drawLine(startPos: Position, endPos: Position) {
    if (this.game.ctx) {
      this.game.ctx.strokeStyle = 'black';
      this.game.ctx.lineWidth = 1;
      this.game.ctx.beginPath();
      this.game.ctx.moveTo(startPos.x, startPos.y);
      this.game.ctx.lineTo(endPos.x, endPos.y);
      this.game.ctx.stroke();
    }
  }
  draw() {
    const firstLineX = GRID_SIZE - (this.game.snake.position.x % GRID_SIZE);
    let currentLineX = firstLineX;
    // //draw verticel line
    while (currentLineX <= SCREEN_WIDTH) {
      this.drawLine(
        {
          x: currentLineX + this.game.screen.position.left,
          y: this.game.screen.position.top,
        },
        { x: currentLineX + this.game.screen.position.left, y: this.game.screen.position.bottom },
      );
      currentLineX += GRID_SIZE;
    }

    const firstLineY = GRID_SIZE - (this.game.snake.position.y % GRID_SIZE);
    let currentLineY = firstLineY;
    // draw horizontal line
    while (currentLineY <= SCREEN_WIDTH) {
      this.drawLine(
        {
          x: this.game.screen.position.left,
          y: currentLineY + this.game.screen.position.top - GRID_SIZE,
        },
        { x: this.game.screen.position.right, y: currentLineY + this.game.screen.position.top - GRID_SIZE },
      );
      currentLineY += GRID_SIZE;
    }
  }
}
