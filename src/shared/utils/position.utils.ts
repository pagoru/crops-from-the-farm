import { Point } from "@openhotel/pixi-components";
import { BLOCK_SIZE } from "shared/consts";

export const getPositionFromIsometricPosition = (position: Point): Point => ({
  x: (position.x - position.y) * 2,
  y: position.x + position.y,
});

export const getIsometricPositionFromPosition = (position: Point): Point => ({
  x: (position.y + position.x / 2) / 2,
  y: (position.y - position.x / 2) / 2,
});

export const getPositionFromBlockIsometricPosition = (
  position: Point,
): Point => ({
  x: position.x * BLOCK_SIZE.width - position.y * BLOCK_SIZE.width,
  y: position.x * BLOCK_SIZE.height + position.y * BLOCK_SIZE.height,
});

export const getZIndexFromIsometricPosition = (
  position?: Partial<Point>,
): number => (position?.x ?? 0) + (position?.y ?? 0);
