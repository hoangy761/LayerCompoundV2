export interface Position {
  x: number;
  y: number;
}

export interface PositionRectangle {
  top: number; // top left
  bottom: number;
  left: number;
  right: number; // bottom right
}

export interface StyleSnakeAttributes {
  color: string;
  borderColor?: string;
  width: number;
}

export interface stylesSnake {
  [key: string]: StyleSnakeAttributes;
}

export interface Dot {
  pos: Position;
  color: string;
  size: number;
  borderColor?: string;
}
