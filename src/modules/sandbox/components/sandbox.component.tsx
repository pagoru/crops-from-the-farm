import React, { useMemo, useRef } from "react";
import {
  ContainerComponent,
  ContainerRef,
  SpriteComponent,
  SpriteTextComponent,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import { getNoise } from "shared/utils";

export const SandboxComponent: React.FC = () => {
  const mapRef = useRef<ContainerRef>(null);

  const renderMap = useMemo(() => {
    const noise = getNoise();
    const list = [];
    const size = 20;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const currentNoise = noise(x, y);
        list.push(
          <SpriteComponent
            key={x + "_" + y}
            texture={currentNoise > 0 ? "grass_1" : "grass_0"}
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
    <ContainerComponent>
      <SpriteTextComponent text={"A A A"} spriteSheet={SpriteSheetEnum.FONT} />
      <ContainerComponent ref={mapRef}>{renderMap}</ContainerComponent>
    </ContainerComponent>
  );
};
