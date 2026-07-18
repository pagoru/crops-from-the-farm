import React from "react";
import { SpriteSheetEnum } from "shared/enums";
import { Point, SpriteComponent } from "@openhotel/pixi-components";

type Props = {
  position?: Point;
  type?: string;
};

export const BlockComponent: React.FC<Props> = ({
  position = { x: 0, y: 0 },
  type = "grass_0",
}) => {
  return (
    <SpriteComponent
      texture={type}
      spriteSheet={SpriteSheetEnum.WORLD}
      position={{
        x: position.x * 8 - position.y * 8,
        y: position.x * 4 + position.y * 4,
      }}
      zIndex={position.x + position.y - 10_000_000}
      pivot={{
        x: 8,
        y: 5,
      }}
    />
  );
};
