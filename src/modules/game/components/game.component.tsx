import React from "react";
import {
  CameraProvider,
  GameProvider,
  GuiComponent,
  PlayerProvider,
  PlayerComponent,
  MapComponent,
} from "modules/game";
import { ContainerComponent } from "@openhotel/pixi-components";

export const GameComponent: React.FC = () => {
  return (
    <CameraProvider guiChildren={<GuiComponent />}>
      <GameProvider>
        <PlayerProvider>
          <ContainerComponent>
            <MapComponent />
            <PlayerComponent />
          </ContainerComponent>
        </PlayerProvider>
      </GameProvider>
    </CameraProvider>
  );
};
