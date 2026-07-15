import React, { useMemo } from "react";
import {
  SpriteComponent,
  SpriteTextComponent,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import ControlledPlayerComponent from "./controlled-player.component.tsx";

export const SandboxComponent: React.FC = () => {
  const renderMap = useMemo(() => {
    const list = [];
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        list.push(
          <SpriteComponent
            key={x + "_" + y}
            texture={"grass_0"}
            spriteSheet={SpriteSheetEnum.WORLD}
            position={{
              x: x * 8 - y * 8,
              y: x * 4 + y * 4,
            }}
          />,
        );
      }
    }
    return list;
  }, []);

  return (
    <>
      {renderMap}
      <SpriteTextComponent text={"A A A"} spriteSheet={SpriteSheetEnum.FONT} />
      <ControlledPlayerComponent />
    </>
  );
};
