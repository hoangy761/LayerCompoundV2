import {
  COLORS,
  GAME_WIDTH,
  INIT_SNAKE_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SNAKE_SPEED,
} from "../../constants";
import { IPlayer } from "../../interfaces";
import { getRandomInteger } from "../commons";
import { createTail } from "./position";

export const createNewPlayers = (id: string, name: string) => {
  const initPosition = {
    x: getRandomInteger(SCREEN_WIDTH / 2, GAME_WIDTH - SCREEN_WIDTH / 2),
    y: getRandomInteger(SCREEN_HEIGHT / 2, GAME_WIDTH - SCREEN_HEIGHT / 2),
  };
  const newPlayer = {
    id: id,
    name: name,
    snake: {
      angle: 0,
      isAlive: true,
      speed: SNAKE_SPEED,
      position: initPosition,
      tailPositions: createTail(INIT_SNAKE_SIZE, initPosition),
      positionCollision: {
        x: initPosition.x + INIT_SNAKE_SIZE,
        y: initPosition.y,
      },
      style: {
        // borderColor: 'red',
        color: COLORS[getRandomInteger(0, COLORS.length - 1)],
        size: INIT_SNAKE_SIZE,
      },
      styleShadow: {
        // borderColor: 'rgba(0,0,0,0.1)',
        color: "rgba(0,0,0,0.1)",
        size: INIT_SNAKE_SIZE + INIT_SNAKE_SIZE / 9,
      },
    },
  };

  return newPlayer;
};
