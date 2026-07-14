import React from "react";
import { SandboxComponent } from "modules/sandbox";

export const ROUTE_MAP: Record<string, React.FC> = {
  sandbox: SandboxComponent,
};

export const DEFAULT_ROUTE = ROUTE_MAP["sandbox"];
