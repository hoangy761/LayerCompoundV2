export function getRandomInteger(a: number, b: number): number {
  return Math.floor(a + Math.random() * (b - a));
}
