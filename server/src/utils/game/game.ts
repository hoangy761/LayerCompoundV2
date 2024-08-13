import {
  COLORS,
  GAME_WIDTH,
  INIT_SNAKE_LENGTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SNAKE_SPEED,
} from "../../constants";
import { getRandomInteger } from "../commons";
import { createTail } from "./position";

export const createNewPlayers = (id: string, name: string) => {
  const initPosition = {
    x: getRandomInteger(SCREEN_WIDTH / 2, GAME_WIDTH - SCREEN_WIDTH / 2),
    y: getRandomInteger(SCREEN_HEIGHT / 2, GAME_WIDTH - SCREEN_HEIGHT / 2),
  };
  const initTailPositions = createTail(INIT_SNAKE_LENGTH, initPosition);
  const newPlayer = {
    id: id,
    name: name,
    snake: {
      angle: 0,
      isAlive: true,
      speed: SNAKE_SPEED,
      position: initPosition,
      tailPositions: initTailPositions,
      positionCollision: {
        x: initPosition.x + initTailPositions.length / 5,
        y: initPosition.y,
      },
      style: {
        borderColor: COLORS[getRandomInteger(0, COLORS.length - 1)],
        color: COLORS[getRandomInteger(0, COLORS.length - 1)],
        size: initTailPositions.length / 5,
      },
      styleShadow: {
        // borderColor: 'rgba(0,0,0,0.1)',
        color: "rgba(0,0,0,0.1)",
        size: initTailPositions.length / 5 + initTailPositions.length / 5 / 9,
      },
    },
  };

  return newPlayer;
};
