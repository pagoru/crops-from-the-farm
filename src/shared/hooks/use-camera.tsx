import React, { ReactNode, useCallback, useContext } from "react";
import { Point } from "@openhotel/pixi-components";
import { create } from "zustand";

type CameraStoreState = {
  $isDragging: boolean;
  $canDrag: boolean;
  $position: Point;

  isDragging: () => boolean;
  setDragging: (dragging: boolean) => void;

  canDrag: () => boolean;
  setCanDrag: (canDrag: boolean) => void;

  getPosition: () => Point;
  setPosition: (position: Point) => void;
};

const useCameraStore = create<CameraStoreState>((set, get) => ({
  $isDragging: false,
  $canDrag: true,
  $position: { x: 0, y: 0 },

  isDragging: () => get().$isDragging,
  setDragging: ($isDragging) => set({ $isDragging }),

  canDrag: () => get().$canDrag,
  setCanDrag: ($canDrag) => set({ $canDrag }),

  getPosition: () => get().$position,
  setPosition: ($position) => set({ $position }),
}));

type State = {
  position: Point;
  setPosition: (position: Point) => void;

  setDragging: (dragging: boolean) => void;
  isDragging: () => boolean;

  setCanDrag: (canDrag: boolean) => void;
  canDrag: () => boolean;
};

const CameraContext = React.createContext<State>(undefined);

type CameraProps = {
  children: ReactNode;
};

export const CameraProvider: React.FunctionComponent<CameraProps> = ({
  children,
}) => {
  const {
    isDragging,
    canDrag,
    $position,
    setDragging: $setDragging,
    setCanDrag: $setCanDrag,
    setPosition: $setPosition,
  } = useCameraStore();

  const setDragging = useCallback(
    (dragging: boolean) => $setDragging(dragging),
    [$setDragging],
  );

  const setCanDrag = useCallback(
    (canDrag: boolean) => $setCanDrag(canDrag),
    [$setCanDrag],
  );

  const setPosition = useCallback(
    (position: Point) => $setPosition(position),
    [$setPosition],
  );

  return (
    <CameraContext.Provider
      value={{
        isDragging,
        canDrag,
        position: $position,
        setDragging,
        setCanDrag,
        setPosition,
      }}
      children={children}
    />
  );
};

export const useCamera = (): State => useContext(CameraContext);
