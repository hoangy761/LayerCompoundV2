import { GAME_WIDTH } from './constants';
import { Game } from './Game';
import { Position } from './interfaces';

export class Barrier {
  game: Game;
  constructor(_game: Game) {
    this.game = _game;
  }
  update() {}
  drawLine(startPos: Position, endPos: Position) {
    if (this.game.ctx) {
      this.game.ctx.strokeStyle = 'red';
      this.game.ctx.lineWidth = 10;
      this.game.ctx.beginPath();
      this.game.ctx.moveTo(startPos.x, startPos.y);
      this.game.ctx.lineTo(endPos.x, endPos.y);
      this.game.ctx.stroke();
    }
  }
  drawLineTop() {
    this.drawLine({ x: 0, y: 0 }, { x: GAME_WIDTH, y: 0 });
  }
  drawLineLeft() {
    this.drawLine({ x: 0, y: 0 }, { x: 0, y: GAME_WIDTH });
  }
  drawLineBottom() {
    this.drawLine({ x: 0, y: GAME_WIDTH }, { x: GAME_WIDTH, y: GAME_WIDTH });
  }
  drawLineRight() {
    this.drawLine({ x: GAME_WIDTH, y: 0 }, { x: GAME_WIDTH, y: GAME_WIDTH });
  }

  draw() {
    console.log('ddax ve ne 12');
    this.drawLine({ x: 0, y: 0 }, { x: GAME_WIDTH, y: 0 });
  }
}
