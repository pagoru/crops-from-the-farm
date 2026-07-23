import React from "react";
import {
  AnimatedSpriteComponent,
  ContainerComponent,
  PlayStatus,
  Point,
  SpriteComponent,
} from "@openhotel/pixi-components";
import { CharacterAnimation, SpriteSheetEnum } from "shared/enums";
import { CHARACTER_ANIMATIONS_SPEED, CHARACTER_MID_SIZE } from "shared/consts";
import { useEntity } from "shared/hooks";

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
  const entityProps = useEntity({ position });

  return (
    <ContainerComponent
      pivot={{
        x: CHARACTER_MID_SIZE.x,
        y: CHARACTER_MID_SIZE.y,
      }}
      {...entityProps}
    >
      <AnimatedSpriteComponent
        spriteSheet={SpriteSheetEnum.PLAYER}
        animation={animation}
        playStatus={PlayStatus.PLAY}
        animationSpeed={CHARACTER_ANIMATIONS_SPEED[animation]}
        scale={{ x: direction === "right" ? 1 : -1 }}
        pivot={{
          x: direction === "right" ? 0 : 1,
        }}
      />
      <SpriteComponent texture="shadow" spriteSheet={SpriteSheetEnum.PLAYER} />
    </ContainerComponent>
  );
};
