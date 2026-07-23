import React from "react";
import { SpriteSheetEnum } from "shared/enums";
import { Point, SpriteComponent } from "@openhotel/pixi-components";
import { useBlockEntity } from "shared/hooks";

type Props = {
  position?: Point;
  type?: string;
};

export const BlockComponent: React.FC<Props> = ({
  position = { x: 0, y: 0 },
  type = "grass_0",
}) => {
  const blockEntityProps = useBlockEntity({ position, extraZIndex: -4 });

  return (
    <SpriteComponent
      texture={type}
      spriteSheet={SpriteSheetEnum.WORLD}
      pivot={{
        x: 8,
        y: 5,
      }}
      {...blockEntityProps}
    />
  );
};
