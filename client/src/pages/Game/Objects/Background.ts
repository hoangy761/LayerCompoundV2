import { GRID_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { IPosition } from '../interfaces';
import { Game } from './Game';

export class Background {
  game: Game;
  constructor(_game: Game) {
    this.game = _game;
  }
  drawLine(startPos: IPosition, endPos: IPosition) {
    if (this.game.ctx) {
      this.game.ctx.strokeStyle = '#8f8f8f';
      this.game.ctx.lineWidth = 1;
      this.game.ctx.beginPath();
      this.game.ctx.moveTo(startPos.x, startPos.y);
      this.game.ctx.lineTo(endPos.x, endPos.y);
      this.game.ctx.stroke();
    }
  }
  update() {}

  draw() {
    const firstLineX = GRID_SIZE - (this.game.snake.position.x % GRID_SIZE);
    let currentLineX = firstLineX;
    // //draw verticel line
    while (currentLineX <= SCREEN_WIDTH) {
      this.drawLine(
        {
          x: currentLineX,
          y: 0,
        },
        { x: currentLineX, y: SCREEN_HEIGHT },
      );
      currentLineX += GRID_SIZE;
    }

    const firstLineY = GRID_SIZE - (this.game.snake.position.y % GRID_SIZE);
    let currentLineY = firstLineY;
    // draw horizontal line
    while (currentLineY <= SCREEN_HEIGHT) {
      this.drawLine(
        {
          x: 0,
          y: currentLineY,
        },
        { x: SCREEN_WIDTH, y: currentLineY },
      );
      currentLineY += GRID_SIZE;
    }
  }
}
