import { GAME_WIDTH, MINI_MAP_GAME_WIDTH, SCREEN_WIDTH } from '../constants';
import { CanvasNameEnum } from '../enums';
import { IDot } from '../interfaces';
import { Game } from '../Objects/Game';

export function drawDot(game: Game, ctx: CanvasRenderingContext2D, dot: IDot, type: CanvasNameEnum) {
  if (type == CanvasNameEnum.GAME) {
    if (ctx) {
      ctx.beginPath();
      // ctx.arc(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 10, 0, Math.PI * 2);
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
        dot.size < 3 ? dot.size : dot.size / 3,
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
