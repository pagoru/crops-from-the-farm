import React, { useMemo } from "react";
import { SpriteSheetEnum } from "shared/enums";
import { Point, SpriteComponent } from "@openhotel/pixi-components";
import {
  getPositionFromBlockIsometricPosition,
  getZIndexFromIsometricPosition,
} from "shared/utils";

type Props = {
  position?: Point;
  type?: string;
};

export const BlockComponent: React.FC<Props> = ({
  position = { x: 0, y: 0 },
  type = "grass_0",
}) => {
  const $position = useMemo(
    () => getPositionFromBlockIsometricPosition(position),
    [position],
  );

  const $zIndex = useMemo(
    () => getZIndexFromIsometricPosition(position) - 10_000_000,
    [position],
  );

  return (
    <SpriteComponent
      texture={type}
      spriteSheet={SpriteSheetEnum.WORLD}
      position={$position}
      zIndex={$zIndex}
      pivot={{
        x: 8,
        y: 5,
      }}
    />
  );
};
