import React, { useEffect, useMemo, useState } from "react";
import {
  ContainerComponent,
  Event,
  Point,
  useEvents,
  useWindow,
} from "@openhotel/pixi-components";

type Props = {
  characterPosition?: Point;
} & React.PropsWithChildren;

export const CameraComponent: React.FC<Props> = ({
  characterPosition,
  children,
}) => {
  const { getSize } = useWindow();
  const { on: onEvent } = useEvents();

  const [windowSize, setWindowSize] = useState(getSize());
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const onRemoveResize = onEvent(Event.RESIZE, () => {
      setWindowSize(getSize());
    });

    setWindowSize(getSize());

    return () => {
      onRemoveResize();
    };
  }, [onEvent]);

  return <ContainerComponent position={{}} children={children} />;
};
