import { useMemo } from "react";
import {
  getIsometricPositionFromPosition,
  getPositionFromBlockIsometricPosition,
  getZIndexFromIsometricPosition,
} from "shared/utils";
import { Point } from "@openhotel/pixi-components";

type Props = {
  position?: Partial<Point>;
  extraZIndex?: number;
};

export const useBlockEntity = ({ position, extraZIndex = 0 }: Props) => {
  const $position = useMemo(
    () => getPositionFromBlockIsometricPosition({ x: 0, y: 0, ...position }),
    [position],
  );

  const $zIndex = useMemo(
    () =>
      getZIndexFromIsometricPosition(
        getIsometricPositionFromPosition($position),
      ) + extraZIndex,
    [$position, extraZIndex],
  );

  return useMemo(
    () => ({ position: $position, zIndex: $zIndex }),
    [$position, $zIndex],
  );
};
