import React, { useMemo, useRef } from "react";
import {
  ContainerComponent,
  Point,
  SpriteComponent,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import {
  getPositionFromIsometricPosition,
  getRandomNumber,
} from "shared/utils";
import { useTree } from "modules/game";

type Props = {
  position?: Partial<Point>;
};

export const TreeComponent: React.FC<Props> = ({
  position = { x: 0, y: 0 },
}) => {
  const { getSway } = useTree();

  const seedRef = useRef<number>(getRandomNumber(0, 10_000_000));

  const $position = useMemo(
    () =>
      getPositionFromIsometricPosition({
        x: 0,
        y: 0,
        ...position,
      }),
    [position],
  );

  const sway = useMemo(() => getSway(seedRef.current), [getSway]);

  return (
    <ContainerComponent
      position={$position}
      pivot={{
        x: 18,
        y: 43,
      }}
      zIndex={(position.x ?? 0) + (position.y ?? 0)}
    >
      <SpriteComponent
        texture="tree"
        spriteSheet={SpriteSheetEnum.WORLD}
        position={{
          x: sway,
        }}
        maskPolygon={[
          //
          0, 0,
          //
          0, 8,
          //
          32, 8,
          //
          32, 0,
        ]}
      />
      <SpriteComponent
        texture="tree"
        spriteSheet={SpriteSheetEnum.WORLD}
        position={{
          x: sway * 0.83,
        }}
        maskPosition={{
          x: 0,
          y: 8,
        }}
        maskPolygon={[
          //
          0, 0,
          //
          0, 4,
          //
          32, 4,
          //
          32, 0,
        ]}
      />
      <SpriteComponent
        texture="tree"
        spriteSheet={SpriteSheetEnum.WORLD}
        position={{
          x: sway * 0.66,
        }}
        maskPosition={{
          x: 0,
          y: 12,
        }}
        maskPolygon={[
          //
          0, 0,
          //
          0, 4,
          //
          32, 4,
          //
          32, 0,
        ]}
      />
      <SpriteComponent
        texture="tree"
        spriteSheet={SpriteSheetEnum.WORLD}
        position={{
          x: sway * 0.5,
        }}
        maskPosition={{
          x: 0,
          y: 16,
        }}
        maskPolygon={[
          //
          0, 0,
          //
          0, 8,
          //
          32, 8,
          //
          32, 0,
        ]}
      />
      <SpriteComponent
        texture="tree"
        spriteSheet={SpriteSheetEnum.WORLD}
        maskPosition={{
          x: 0,
          y: 24,
        }}
        maskPolygon={[
          //
          0, 0,
          //
          0, 24,
          //
          32, 24,
          //
          32, 0,
        ]}
      />
    </ContainerComponent>
  );
};
