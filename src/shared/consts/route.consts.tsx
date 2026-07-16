import React from "react";
import { SandboxComponent } from "modules/sandbox";
import { GameComponent } from "modules/game";

export const ROUTE_MAP: Record<string, React.FC> = {
  sandbox: SandboxComponent,
  game: GameComponent,
};

export const DEFAULT_ROUTE = ROUTE_MAP["game"];
