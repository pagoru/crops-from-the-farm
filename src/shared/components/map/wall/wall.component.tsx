import React from "react";
import { Point, SpriteComponent } from "@openhotel/pixi-components";
import { useEntity } from "shared/hooks";
import { CrossDirection, SpriteSheetEnum, WallType } from "shared/enums";

type Props = {
  position?: Partial<Point>;
  direction?: CrossDirection;
  type?: WallType;
};

export const WallComponent: React.FC<Props> = ({
  position = { x: 0, y: 0 },
  direction = CrossDirection.EAST_WEST,
  type = WallType.SHORT,
}) => {
  const entityProps = useEntity({ position });

  return (
    <SpriteComponent
      texture={`wall_${type}`}
      spriteSheet={SpriteSheetEnum.WORLD}
      pivot={{
        x: 4,
        y: type === WallType.SHORT ? 9 : 10,
      }}
      scale={{
        x: direction === CrossDirection.EAST_WEST ? -1 : 1,
      }}
      {...entityProps}
    />
  );
};
