import React from "react";
import {
  AnimatedSpriteComponent,
  PlayStatus,
  Point,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import { PLAYER_ANIMATIONS_SPEED } from "shared/consts";

type Props = {
  animation?: string;
  direction?: "right" | "left";
  position?: Point;
};

export const PlayerComponent: React.FC<Props> = ({
  direction = "right",
  animation = "idle",
  position = { x: 0, y: 0 },
}) => {
  return (
    <AnimatedSpriteComponent
      spriteSheet={SpriteSheetEnum.PLAYER}
      animation={animation}
      playStatus={PlayStatus.PLAY}
      animationSpeed={PLAYER_ANIMATIONS_SPEED[animation]}
      scale={{ x: direction === "right" ? 1 : -1 }}
      pivot={{
        x: 1,
      }}
      position={{
        x: (position.x - position.y) * 2,
        y: position.x + position.y,
      }}
    />
  );
};
