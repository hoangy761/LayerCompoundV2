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

export function isEat(
  centerPos: IPosition,
  radius: number,
  angleInDegrees: number,
  foodPos: IPosition
): boolean {
  if (calculateDistance(centerPos, foodPos) <= radius + 10) {
    return true;
  }
  return false;
}

export function calculateDistance(
  startPos: IPosition,
  endPos: IPosition
): number {
  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function isPointOutsideCircle(
  _centerCircle: IPosition,
  _pos: IPosition,
  _radius: number
): boolean {
  // distance from _pos to Center Circle
  const distance = Math.sqrt(
    (_pos.x - _centerCircle.x) ** 2 + (_pos.y - _centerCircle.y) ** 2
  );

  return distance > _radius;
}
