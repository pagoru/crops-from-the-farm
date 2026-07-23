import React, { useMemo } from "react";
import { Point, SpriteComponent } from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import {
  getPositionFromBlockIsometricPosition,
  getZIndexFromIsometricPosition,
} from "shared/utils";
import { BLOCK_SIZE } from "shared/consts";

type Props = {
  type?: 0 | 1 | 2 | 3;
  position?: Partial<Point>;
};

export const HedgeComponent: React.FC<Props> = ({ type = 0, position }) => {
  const $position = useMemo(
    () => getPositionFromBlockIsometricPosition({ x: 0, y: 0, ...position }),
    [position],
  );

  const $zIndex = useMemo(
    () =>
      getZIndexFromIsometricPosition({
        x: (position?.x ?? 0) * BLOCK_SIZE.width,
        y: (position?.y ?? 0) * BLOCK_SIZE.height,
      }),
    [position],
  );

  return (
    <SpriteComponent
      texture={`hedge_${type}`}
      spriteSheet={SpriteSheetEnum.WORLD}
      position={$position}
      pivot={{
        x: 8,
        y: 8,
      }}
      zIndex={$zIndex}
    />
  );
};
