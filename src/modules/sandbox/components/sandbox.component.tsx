import React from "react";
import {
  SpriteComponent,
  SpriteTextComponent,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";

export const SandboxComponent: React.FC = () => {
  return (
    <>
      <SpriteComponent
        texture={"grass_0"}
        spriteSheet={SpriteSheetEnum.WORLD}
      />
      <SpriteComponent
        texture={"grass_1"}
        spriteSheet={SpriteSheetEnum.WORLD}
        position={{
          x: 8,
          y: 4,
        }}
      />
      <SpriteTextComponent text={"A A A"} spriteSheet={SpriteSheetEnum.FONT} />
    </>
  );
};
