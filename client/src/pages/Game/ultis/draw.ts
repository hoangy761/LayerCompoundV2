import { GAME_WIDTH, INIT_SNAKE_SIZE, MINI_MAP_GAME_WIDTH, SCREEN_WIDTH } from '../constants';
import { CanvasNameEnum, StyleSnakeEnum } from '../enums';
import { Position, stylesSnake } from '../interfaces';
import { Game } from '../Objects/Game';

export function drawCircle(
  game: Game,
  ctx: CanvasRenderingContext2D,
  pos: Position,
  styleName: StyleSnakeEnum,
  type: CanvasNameEnum,
) {
  const styles: stylesSnake = {};
  styles[StyleSnakeEnum.SNAKE] = {
    color: 'red',
    borderColor: 'green',
    width: INIT_SNAKE_SIZE,
  };
  styles[StyleSnakeEnum.SHADOW] = {
    color: 'rgba(0,0,0,0.1)',
    borderColor: 'rgba(0,0,0,0.1)',
    width: INIT_SNAKE_SIZE + INIT_SNAKE_SIZE / 9,
  };
  styles[StyleSnakeEnum.EYE] = {
    color: 'black',
    width: INIT_SNAKE_SIZE / 4,
  };
  styles[StyleSnakeEnum.POINT] = {
    color: 'black',
    width: 4,
  };
  styles[StyleSnakeEnum.SCLERA] = {
    color: 'white',
    width: INIT_SNAKE_SIZE / 2,
  };

  const styleProperties = styles[styleName];
  if (type == CanvasNameEnum.GAME) {
    if (ctx) {
      ctx.beginPath();
      // ctx.arc(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 10, 0, Math.PI * 2);
      ctx.arc(
        pos.x - game.screen.position.left,
        pos.y - game.screen.position.top - SCREEN_WIDTH / 4,
        styleProperties.width,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = styleProperties.color;
      ctx.fill();
      styleProperties.borderColor ? (ctx.strokeStyle = styleProperties.borderColor) : '';
      ctx.stroke();
    }
  }
  if (type == CanvasNameEnum.MINI_MAP) {
    if (ctx) {
      ctx.beginPath();
      // ctx.arc(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 10, 0, Math.PI * 2);
      // ctx.arc(pos.x, pos.y, styleProperties.width, 0, Math.PI * 2);
      ctx.arc(
        pos.x / (GAME_WIDTH / MINI_MAP_GAME_WIDTH),
        pos.y / (GAME_WIDTH / MINI_MAP_GAME_WIDTH),
        styleProperties.width,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = styleProperties.color;
      ctx.fill();
      styleProperties.borderColor ? (ctx.strokeStyle = styleProperties.borderColor) : '';
      ctx.stroke();
      console.log(pos.x / (GAME_WIDTH / MINI_MAP_GAME_WIDTH), pos.y / (GAME_WIDTH / MINI_MAP_GAME_WIDTH));
    }
  }
}
