import React from "react";
import { SpriteSheetEnum } from "shared/enums";
import {
  SpriteTextComponent,
  SpriteTextProps,
} from "@openhotel/pixi-components";

type Props = Omit<SpriteTextProps, "spriteSheet">;

export const TextComponent: React.FC<Props> = ({ ...props }) => (
  <SpriteTextComponent spriteSheet={SpriteSheetEnum.FONT} {...props} />
);
