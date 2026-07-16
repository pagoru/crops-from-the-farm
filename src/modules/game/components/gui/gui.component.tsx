import React from "react";
import { SpriteTextComponent } from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";

export const GuiComponent: React.FC = () => {
  return (
    <>
      <SpriteTextComponent text={"A A A"} spriteSheet={SpriteSheetEnum.FONT} />
    </>
  );
};
