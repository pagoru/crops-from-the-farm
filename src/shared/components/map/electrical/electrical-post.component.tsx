import React from "react";
import { Point, SpriteComponent } from "@openhotel/pixi-components";
import { CrossDirection, SpriteSheetEnum } from "shared/enums";
import { useEntity } from "shared/hooks";

type Props = {
  direction?: CrossDirection;
  position?: Partial<Point>;
};

export const ElectricalPostComponent: React.FC<Props> = ({
  direction = CrossDirection.NORTH_SOUTH,
  position,
}) => {
  const entityProps = useEntity({ position });

  return (
    <SpriteComponent
      texture="electrical_post"
      spriteSheet={SpriteSheetEnum.WORLD}
      pivot={{
        x: 6 + (direction === CrossDirection.NORTH_SOUTH ? 0 : 1),
        y: 43,
      }}
      scale={{
        x: direction === CrossDirection.NORTH_SOUTH ? 1 : -1,
      }}
      {...entityProps}
    />
  );
};
