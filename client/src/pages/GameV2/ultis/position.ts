import { IPosition } from '../interfaces';

export function getPointOnCircumference(centerPos: IPosition, radius: number, angleInDegrees: number): IPosition {
  const x = centerPos.x + Math.cos(angleInDegrees) * radius;
  const y = centerPos.y + Math.sin(angleInDegrees) * radius;

  return { x, y };
}

export function isConllision(pos: IPosition, boundaryX: number, boundaryY: number): boolean {
  if (pos.x <= 0 || pos.x >= boundaryX || pos.y <= 0 || pos.y >= boundaryY) {
    return true;
  }
  return false;
}

export function isEat(centerPos: IPosition, radius: number, angleInDegrees: number, foodPos: IPosition): boolean {
  if (calculateDistance(centerPos, foodPos) <= radius + 10) {
    return true;
  }
  return false;
}

export function calculateDistance(startPos: IPosition, endPos: IPosition): number {
  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;
  return Math.sqrt(dx * dx + dy * dy);
}
