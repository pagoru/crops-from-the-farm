import { Point } from "@openhotel/pixi-components";
import { CHARACTER_MID_SIZE } from "shared/consts";

export const getPositionFromIsometricPosition = (position: Point): Point => ({
  x: (position.x - position.y) * 2,
  y: position.x + position.y,
});

export const getRealPositionFromIsometricPosition = (
  position: Point,
): Point => {
  const pos = getPositionFromIsometricPosition(position);
  return {
    x: pos.x - CHARACTER_MID_SIZE.x,
    y: pos.y - CHARACTER_MID_SIZE.y,
  };
};
