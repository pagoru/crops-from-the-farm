import React, { useMemo } from "react";
import {
  CameraProvider,
  GameProvider,
  GuiComponent,
  PlayerProvider,
  PlayerComponent,
  MapComponent,
  SwayAnimationProvider,
} from "modules/game";
import { ContainerComponent } from "@openhotel/pixi-components";
import { NesterComponent } from "shared/components";

export const GameComponent: React.FC = () => {
  const providers = useMemo(
    () => [
      (props: React.PropsWithChildren) => (
        <CameraProvider guiChildren={<GuiComponent />} {...props} />
      ),
      GameProvider,
      PlayerProvider,
      SwayAnimationProvider,
    ],
    [],
  );

  return (
    <NesterComponent components={providers}>
      <ContainerComponent>
        <MapComponent />
        <PlayerComponent />
      </ContainerComponent>
    </NesterComponent>
  );
};
