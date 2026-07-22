import React from "react";
import {
  CameraProvider,
  GameProvider,
  GuiComponent,
  PlayerProvider,
  PlayerComponent,
  MapComponent,
  TreeProvider,
} from "modules/game";
import { ContainerComponent } from "@openhotel/pixi-components";

export const GameComponent: React.FC = () => {
  return (
    <CameraProvider guiChildren={<GuiComponent />}>
      <GameProvider>
        <PlayerProvider>
          <TreeProvider>
            <ContainerComponent>
              <MapComponent />
              <PlayerComponent />
            </ContainerComponent>
          </TreeProvider>
        </PlayerProvider>
      </GameProvider>
    </CameraProvider>
  );
};
