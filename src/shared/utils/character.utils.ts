import { Point } from "@openhotel/pixi-components";

export const getPositionFromIsometricPosition = (position: Point): Point => ({
  x: (position.x - position.y) * 2,
  y: position.x + position.y,
});
