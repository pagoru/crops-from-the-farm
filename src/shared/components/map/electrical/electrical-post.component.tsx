import React, { useMemo } from "react";
import { Point, SpriteComponent } from "@openhotel/pixi-components";
import { ElectricalPostDirection, SpriteSheetEnum } from "shared/enums";
import {
  getPositionFromIsometricPosition,
  getZIndexFromIsometricPosition,
} from "shared/utils";

type Props = {
  direction?: ElectricalPostDirection;
  position?: Partial<Point>;
};

export const ElectricalPostComponent: React.FC<Props> = ({
  direction = ElectricalPostDirection.NORTH_SOUTH,
  position,
}) => {
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
      pivot={{
        x: 6 + (direction === ElectricalPostDirection.NORTH_SOUTH ? 0 : 1),
        y: 43,
      }}
      scale={{
        x: direction === ElectricalPostDirection.NORTH_SOUTH ? 1 : -1,
      }}
      zIndex={$zIndex}
    />
  );
};
