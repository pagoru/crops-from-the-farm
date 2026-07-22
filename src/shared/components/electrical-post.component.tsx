import React, { useMemo } from "react";
import { Point, SpriteComponent } from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import {
  getPositionFromIsometricPosition,
  getZIndexFromIsometricPosition,
} from "shared/utils";

type Props = {
  position?: Partial<Point>;
};

export const ElectricalPostComponent: React.FC<Props> = ({ position }) => {
  const $position = useMemo(
    () => getPositionFromIsometricPosition({ x: 0, y: 0, ...position }),
    [position],
  );

  const $zIndex = useMemo(
    () => getZIndexFromIsometricPosition(position),
    [position],
  );

  return (
    <SpriteComponent
      texture="electrical_post"
      spriteSheet={SpriteSheetEnum.WORLD}
      position={$position}
      zIndex={$zIndex}
    />
  );
};
