import { IPosition } from "../interfaces";

export class Food {
  private Pos: IPosition;
  public get pos(): IPosition {
    return this.Pos;
  }
  public set pos(value: IPosition) {
    this.Pos = value;
  }
  private Color: string;
  public get color(): string {
    return this.Color;
  }
  public set color(value: string) {
    this.Color = value;
  }
  private Size: number;
  public get size(): number {
    return this.Size;
  }
  public set size(value: number) {
    this.Size = value;
  }
  private BorderColor: string | null;
  public get borderColor(): string | null {
    return this.BorderColor;
  }
  public set borderColor(value: string | null) {
    this.BorderColor = value;
  }
  constructor(
    _pos: IPosition,
    _color: string,
    _size: number,
    _borderColor?: string
  ) {
    this.Pos = _pos;
    this.Color = _color;
    this.Size = _size;
    this.BorderColor = _borderColor || null;
  }
}
