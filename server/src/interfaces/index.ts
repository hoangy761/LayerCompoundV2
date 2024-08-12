export interface IPosition {
  x: number;
  y: number;
}

export interface IPositionRectangle {
  top: number; // top left
  bottom: number;
  left: number;
  right: number; // bottom right
}

export interface IStyleSnakeAttributes {
  color: string;
  borderColor?: string;
  width: number;
}

export interface IStylesSnake {
  [key: string]: IStyleSnakeAttributes;
}

export interface IDot {
  pos: IPosition;
  color: string;
  size: number;
  borderColor?: string;
}
export interface IStyle {
  color: string;
  size: number;
  borderColor?: string;
}
export interface IUserPoint {
  id: number;
  name: string;
  userScore: number; // or userPoints, points, score
}

export interface ISnake {
  angle: number;
  tailPositions: IPosition[];
  speed: number;
  isAlive: boolean;
  position: IPosition;
  positionCollision: IPosition;
  style: IStyle;
  styleShadow: IStyle;
}

export interface IPlayer {
  id: string;
  name: string;
  snake: ISnake;
}

export interface IDataRealTime {
  foods: IDot[];
  players: IPlayer[];
}
