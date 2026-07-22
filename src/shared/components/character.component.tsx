import React, { useMemo } from "react";
import {
  AnimatedSpriteComponent,
  PlayStatus,
  Point,
} from "@openhotel/pixi-components";
import { CharacterAnimation, SpriteSheetEnum } from "shared/enums";
import { CHARACTER_ANIMATIONS_SPEED, CHARACTER_MID_SIZE } from "shared/consts";
import { getPositionFromIsometricPosition } from "shared/utils";

type Props = {
  animation?: CharacterAnimation;
  direction?: "right" | "left";
  position?: Point;
};

export const CharacterComponent: React.FC<Props> = ({
  direction = "right",
  animation = CharacterAnimation.IDLE,
  position = { x: 0, y: 0 },
}) => {
  const $position = useMemo(
    () => getPositionFromIsometricPosition(position),
    [position],
  );

  return (
    <AnimatedSpriteComponent
      spriteSheet={SpriteSheetEnum.PLAYER}
      animation={animation}
      playStatus={PlayStatus.PLAY}
      animationSpeed={CHARACTER_ANIMATIONS_SPEED[animation]}
      scale={{ x: direction === "right" ? 1 : -1 }}
      pivot={{
        x: 1 + CHARACTER_MID_SIZE.x,
        y: CHARACTER_MID_SIZE.y,
      }}
      position={$position}
      zIndex={position.x + position.y}
    />
  );
};
