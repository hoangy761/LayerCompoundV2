import { Position } from '../interfaces';

export function getPointOnCircumference(centerPos: Position, radius: number, angleInDegrees: number): Position {
  const x = centerPos.x + Math.cos(angleInDegrees) * radius;
  const y = centerPos.y + Math.sin(angleInDegrees) * radius;

  return { x, y };
}

export function isConllision(pos: Position, boundaryX: number, boundaryY: number): boolean {
  if (pos.x <= 0 || pos.x >= boundaryX || pos.y <= 0 || pos.y >= boundaryY) {
    return true;
  }
  return false;
}
