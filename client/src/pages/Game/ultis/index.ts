import { Position } from '../interfaces';

export function getPointOnCircumference(centerPos: Position, radius: number, angleInDegrees: number): Position {
  const x = centerPos.x + Math.cos(angleInDegrees) * radius;
  const y = centerPos.y + Math.sin(angleInDegrees) * radius;

  return { x, y };
}
