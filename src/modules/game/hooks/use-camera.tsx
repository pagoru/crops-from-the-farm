import React, { ReactNode, useCallback, useContext, useState } from "react";
import { ContainerComponent, Point } from "@openhotel/pixi-components";

type State = {
  moveTo: (position: Point) => void;
};

const CameraContext = React.createContext<State>(undefined);

type CameraProps = {
  guiChildren?: ReactNode | undefined;
} & React.PropsWithChildren;

export const CameraProvider: React.FunctionComponent<CameraProps> = ({
  guiChildren,
  children,
}) => {
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  const moveTo = useCallback(
    ($position: Point) => {
      setPosition($position);
    },
    [setPosition],
  );

  return (
    <CameraContext.Provider
      value={{
        moveTo,
      }}
      children={
        <>
          {guiChildren}
          <ContainerComponent position={position}>
            {children}
          </ContainerComponent>
        </>
      }
    />
  );
};

export const useCamera = (): State => useContext(CameraContext);
