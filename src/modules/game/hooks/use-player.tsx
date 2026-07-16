import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { create } from "zustand";
import {
  Event,
  Point,
  Size,
  useEvents,
  useWindow,
} from "@openhotel/pixi-components";
import { useCamera } from "modules/game";
import { getPositionFromIsometricPosition } from "shared/utils";

type PlayerStoreState = {};

const usePlayerStore = create<PlayerStoreState>((set, get) => ({}));

type State = {
  position: Point;
  setPosition: (value: SetStateAction<Point>) => void;
};

const PlayerContext = React.createContext<State>(undefined);

type PlayerProps = {} & React.PropsWithChildren;

export const PlayerProvider: React.FunctionComponent<PlayerProps> = ({
  children,
}) => {
  const { on } = useEvents();
  const { getSize } = useWindow();
  const { moveTo } = useCamera();

  const [windowSize, setWindowSize] = useState<Size>(getSize());
  const [cameraPivot, setCameraPivot] = useState<Point>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const removeOnResize = on(Event.RESIZE, (size: Size) => {
      setWindowSize(size);
    });
    return () => {
      removeOnResize();
    };
  }, [on, setWindowSize, setCameraPivot]);

  useEffect(() => {
    moveTo({
      x: windowSize.width / 2 - cameraPivot.x,
      y: windowSize.height / 2 - cameraPivot.y,
    });
  }, [windowSize, cameraPivot, moveTo]);

  useEffect(() => {
    const playerRealPosition = getPositionFromIsometricPosition(position);
    setCameraPivot({
      x: playerRealPosition.x,
      y: playerRealPosition.y,
    });
  }, [setCameraPivot, position]);

  return (
    <PlayerContext.Provider
      value={{
        position,
        setPosition,
      }}
      children={children}
    />
  );
};

export const usePlayer = (): State => useContext(PlayerContext);
