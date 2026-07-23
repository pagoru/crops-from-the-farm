import React from "react";
import { Point, SpriteComponent } from "@openhotel/pixi-components";
import { ElectricalPostDirection, SpriteSheetEnum } from "shared/enums";
import { useEntity } from "shared/hooks";

type Props = {
  direction?: ElectricalPostDirection;
  position?: Partial<Point>;
};

export const ElectricalPostComponent: React.FC<Props> = ({
  direction = ElectricalPostDirection.NORTH_SOUTH,
  position,
}) => {
  const entityProps = useEntity({ position });

  return (
    <SpriteComponent
      texture="electrical_post"
      spriteSheet={SpriteSheetEnum.WORLD}
      pivot={{
        x: 6 + (direction === ElectricalPostDirection.NORTH_SOUTH ? 0 : 1),
        y: 43,
      }}
      scale={{
        x: direction === ElectricalPostDirection.NORTH_SOUTH ? 1 : -1,
      }}
      {...entityProps}
    />
  );
};
