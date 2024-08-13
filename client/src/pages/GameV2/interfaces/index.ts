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
  text?: string;
}
export interface IUserPoint {
  id: string;
  name?: string;
  userScore: number; // or userPoints, points, score
}

export interface ISnake {
  angle: number;
  tailPositions: IPosition[];
  speed: number;
  isAlive: boolean;
  position: IPosition;
  positionCollision: IPosition;
  style: {
    size: number;
    color: string;
    borderColor?: string;
  };
  styleShadow: {
    size: number;
    color: string;
    borderColor?: string;
  };
}

export interface IPlayer {
  id: string;
  name?: string;
  snake: ISnake;
}

export interface IDataRealTime {
  foods: IDot[];
  players: IPlayer[];
}
