import React from "react";
import {
  AnimatedSpriteComponent,
  PlayStatus,
  Point,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import { CHARACTER_ANIMATIONS_SPEED } from "shared/consts";
import { getRealPositionFromIsometricPosition } from "shared/utils";

type Props = {
  animation?: string;
  direction?: "right" | "left";
  position?: Point;
};

export const CharacterComponent: React.FC<Props> = ({
  direction = "right",
  animation = "idle",
  position = { x: 0, y: 0 },
}) => {
  const $position = getRealPositionFromIsometricPosition(position);

  return (
    <AnimatedSpriteComponent
      spriteSheet={SpriteSheetEnum.PLAYER}
      animation={animation}
      playStatus={PlayStatus.PLAY}
      animationSpeed={CHARACTER_ANIMATIONS_SPEED[animation]}
      scale={{ x: direction === "right" ? 1 : -1 }}
      pivot={{
        x: 1,
      }}
      position={$position}
    />
  );
};
