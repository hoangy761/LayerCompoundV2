import { SNAKE_SPEED } from "../../constants";
import { IPosition } from "../../interfaces";

export function createTail(initLenght: number, position: IPosition) {
  const tailPositions: IPosition[] = [];
  for (let index = 0; index < initLenght; index++) {
    tailPositions.push({
      x: position.x - SNAKE_SPEED * index,
      y: position.y,
    });
  }
  return tailPositions;
}

export function getPointOnCircumference(
  centerPos: IPosition,
  radius: number,
  angleInDegrees: number
): IPosition {
  const x = centerPos.x + Math.cos(angleInDegrees) * radius;
  const y = centerPos.y + Math.sin(angleInDegrees) * radius;

  return { x, y };
}
