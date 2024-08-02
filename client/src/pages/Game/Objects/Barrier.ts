import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { Game } from './Game';
import { IPosition } from '../interfaces';

export class Barrier {
  game: Game;
  constructor(_game: Game) {
    this.game = _game;
  }
  update() {}
  drawLineWarning(startPos: IPosition, endPos: IPosition, _lineWidth: number) {
    if (this.game.ctx) {
      this.game.ctx.strokeStyle = 'black';
      this.game.ctx.lineWidth = _lineWidth;
      this.game.ctx.beginPath();
      this.game.ctx.moveTo(startPos.x, startPos.y);
      this.game.ctx.lineTo(endPos.x, endPos.y);
      this.game.ctx.stroke();
    }
  }
  drawLineTop(_lineWidth: number) {
    this.drawLineWarning({ x: 0, y: 0 + _lineWidth / 2 }, { x: SCREEN_WIDTH, y: 0 + _lineWidth / 2 }, _lineWidth);
  }
  drawLineLeft(_lineWidth: number) {
    this.drawLineWarning({ x: 0 + _lineWidth / 2, y: 0 }, { x: 0 + _lineWidth / 2, y: SCREEN_HEIGHT }, _lineWidth);
  }
  drawLineBottom(_lineWidth: number) {
    this.drawLineWarning(
      { x: 0, y: SCREEN_HEIGHT - _lineWidth / 2 },
      { x: SCREEN_WIDTH, y: SCREEN_HEIGHT - _lineWidth / 2 },
      _lineWidth,
    );
  }
  drawLineRight(_lineWidth: number) {
    this.drawLineWarning(
      { x: SCREEN_WIDTH - _lineWidth / 2, y: 0 },
      { x: SCREEN_WIDTH - _lineWidth / 2, y: SCREEN_HEIGHT },
      _lineWidth,
    );
  }

  draw() {
    console.log('ddax ve ne 12');
  }
}
