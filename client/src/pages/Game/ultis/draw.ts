import { GAME_WIDTH, MINI_MAP_GAME_WIDTH, SCREEN_WIDTH } from '../constants';
import { CanvasNameEnum } from '../enums';
import { IDot } from '../interfaces';
import { Game } from '../objects/Game';

export function drawDot(game: Game, ctx: CanvasRenderingContext2D, dot: IDot, type: CanvasNameEnum) {
  if (type == CanvasNameEnum.GAME) {
    if (ctx) {
      ctx.beginPath();
      ctx.arc(
        dot.pos.x - game.screen.position.left,
        dot.pos.y - game.screen.position.top - SCREEN_WIDTH / 4,
        dot.size,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = dot.color;
      ctx.fill();
      if (dot.borderColor) {
        ctx.strokeStyle = dot.borderColor;
        ctx.lineWidth = dot.size / 10;
        ctx.stroke();
      }
    }
  }
  if (type == CanvasNameEnum.MINI_MAP) {
    if (ctx) {
      ctx.beginPath();
      ctx.arc(
        dot.pos.x / (GAME_WIDTH / MINI_MAP_GAME_WIDTH),
        dot.pos.y / (GAME_WIDTH / MINI_MAP_GAME_WIDTH),
        (dot.size / (GAME_WIDTH / MINI_MAP_GAME_WIDTH)) * 4,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = dot.color;
      ctx.fill();
      if (dot.borderColor) {
        ctx.strokeStyle = dot.borderColor;
        ctx.stroke();
      }
    }
  }
}

export function drawText(
  game: Game,
  ctx: CanvasRenderingContext2D,
  _text: IDot,
  _globalAlpha: number,
  type: CanvasNameEnum,
) {
  if (type == CanvasNameEnum.GAME) {
    if (ctx) {
      ctx.font = `${_text.size}px Arial`;
      ctx.fillStyle = _text.color;
      ctx.globalAlpha = _globalAlpha;
      ctx.fillText(
        _text.text || 'Hello world',
        _text.pos.x - game.screen.position.left,
        _text.pos.y - game.screen.position.top - SCREEN_WIDTH / 4,
      );
    }
  }
}
