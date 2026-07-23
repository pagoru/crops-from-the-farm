import React from "react";
import { Point, SpriteComponent } from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import { useBlockEntity } from "shared/hooks";

type Props = {
  type?: 0 | 1 | 2 | 3;
  position?: Partial<Point>;
};

export const HedgeComponent: React.FC<Props> = ({ type = 0, position }) => {
  const blockEntityProps = useBlockEntity({ position });

  return (
    <SpriteComponent
      texture={`hedge_${type}`}
      spriteSheet={SpriteSheetEnum.WORLD}
      pivot={{
        x: 8,
        y: 8,
      }}
      {...blockEntityProps}
    />
  );
};
