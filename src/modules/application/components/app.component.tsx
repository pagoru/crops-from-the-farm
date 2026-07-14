import React, { useMemo } from "react";
import { ApplicationProvider } from "@openhotel/pixi-components";

export const AppComponent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return useMemo(
    () => (
      <ApplicationProvider
        backgroundColor={0xff00ff}
        backgroundAlpha={1}
        scale={3}
        children={children}
      />
    ),
    [],
  );
};
