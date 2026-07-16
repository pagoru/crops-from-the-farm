import React from "react";
import { SpriteComponent } from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";

export const MapComponent: React.FC = () => {
  const x = 0;
  const y = 0;
  const currentNoise = 0;
  return (
    <>
      <SpriteComponent
        key={x + "_" + y}
        texture={currentNoise > 0 ? "grass_1" : "grass_0"}
        spriteSheet={SpriteSheetEnum.WORLD}
        position={{
          x: x * 8 - y * 8,
          y: x * 4 + y * 4,
        }}
      />
    </>
  );
};
