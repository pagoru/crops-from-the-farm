import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ContainerComponent,
  Point,
  SpriteComponent,
  SpriteRef,
  useEvents,
} from "@openhotel/pixi-components";
import { CustomEvent, SpriteSheetEnum, TreeType } from "shared/enums";
import {
  getPositionFromIsometricPosition,
  getRandomNumber,
} from "shared/utils";
import { useSwayAnimation } from "modules/game";
import {
  TREE_MASK_MAP,
  TREE_SPRITE_MAP,
  TREE_SPRITE_PIVOT_MAP,
} from "shared/consts";

type Props = {
  position?: Partial<Point>;
  type?: TreeType;
};

export const TreeComponent: React.FC<Props> = ({
  position = { x: 0, y: 0 },
  type = TreeType.BIG,
}) => {
  const { on } = useEvents();
  const { getSway } = useSwayAnimation();

  const spritesRef = useRef<SpriteRef[]>([]);
  const seedRef = useRef<number>(getRandomNumber(0, 10_000_000));

  const texture = useMemo(() => TREE_SPRITE_MAP[type], [type]);
  const pivot = useMemo(() => TREE_SPRITE_PIVOT_MAP[type], [type]);
  const maskData = useMemo(() => TREE_MASK_MAP[type], [type]);

  useEffect(() => {
    const onRemoveSwayAnimationEvent = on<{ time: number }>(
      CustomEvent.SWAY_ANIMATION,
      ({ time } = { time: 0 }) => {
        spritesRef.current.forEach((sprite, index) => {
          const sway = getSway(time, seedRef.current);
          sprite.component.position.x = Math.round(sway * maskData.sway[index]);
        });
      },
    );

    return () => {
      onRemoveSwayAnimationEvent();
    };
  }, [on, getSway, maskData]);

  const $position = useMemo(
    () =>
      getPositionFromIsometricPosition({
        x: 0,
        y: 0,
        ...position,
      }),
    [position],
  );

  const setSpriteRef = useCallback(
    (index: number) => (ref: SpriteRef) => {
      spritesRef.current[index] = ref;
    },
    [],
  );

  const renderSprites = useMemo(() => {
    const spriteList = [];

    let accumulatedYPosition = 0;
    maskData.divisions.forEach((yPosition, index) => {
      spriteList.push(
        <SpriteComponent
          key={`sprite_${index}`}
          ref={setSpriteRef(index)}
          texture={texture}
          spriteSheet={SpriteSheetEnum.WORLD}
          maskPosition={{
            y: accumulatedYPosition,
          }}
          maskPolygon={[
            //
            0,
            0,
            //
            0,
            yPosition,
            //
            maskData.size.width,
            yPosition,
            //
            maskData.size.width,
            0,
          ]}
        />,
      );
      accumulatedYPosition += yPosition;
    });

    const lastHeight = maskData.size.height - accumulatedYPosition;
    if (lastHeight > 0)
      spriteList.push(
        <SpriteComponent
          texture={texture}
          spriteSheet={SpriteSheetEnum.WORLD}
          maskPosition={{
            y: accumulatedYPosition,
          }}
          maskPolygon={[
            //
            0,
            0,
            //
            0,
            lastHeight,
            //
            maskData.size.width,
            lastHeight,
            //
            maskData.size.width,
            0,
          ]}
        />,
      );

    return spriteList;
  }, [maskData]);

  return (
    <ContainerComponent
      position={$position}
      pivot={pivot}
      zIndex={(position.x ?? 0) + (position.y ?? 0)}
    >
      {renderSprites}
    </ContainerComponent>
  );
};
