import { useMemo } from "react";
import {
  getPositionFromIsometricPosition,
  getZIndexFromIsometricPosition,
} from "shared/utils";
import { Point } from "@openhotel/pixi-components";

type Props = {
  position?: Partial<Point>;
  extraZIndex?: number;
};

export const useEntity = ({ position, extraZIndex = 0 }: Props) => {
  const $position = useMemo(
    () => getPositionFromIsometricPosition({ x: 0, y: 0, ...position }),
    [position],
  );

  const $zIndex = useMemo(
    () => getZIndexFromIsometricPosition(position) + extraZIndex,
    [position, extraZIndex],
  );

  return useMemo(
    () => ({ position: $position, zIndex: $zIndex }),
    [$position, $zIndex],
  );
};
