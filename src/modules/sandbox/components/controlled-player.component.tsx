import React, { useCallback, useEffect, useRef, useState } from "react";
import { PlayerComponent } from "shared/components";
import { Event, Point, useEvents } from "@openhotel/pixi-components";
import { useTicker } from "shared/hooks";
import { TickerQueue } from "@oh/queue";

type Props = {
  onChangePosition?: (position: Point) => void;
};

export const ControlledPlayerComponent: React.FC<Props> = ({
  onChangePosition,
}) => {
  const { on } = useEvents();
  const { add } = useTicker();

  const currentKeyCode = useRef([]);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  const $setPosition = useCallback(
    (
      onPosition: (pos: Point) => Partial<Point>,
      direction: "right" | "left",
    ) => {
      setPosition(($position) => {
        const $point = { ...$position, ...onPosition($position) };
        onChangePosition?.($point);
        return $point;
      });
      setDirection(direction);
    },
    [onChangePosition, setPosition, setDirection],
  );

  useEffect(() => {
    const removeOnKeyDown = on(Event.KEY_DOWN, (event: KeyboardEvent) => {
      if (!["KeyW", "KeyD", "KeyA", "KeyS"].includes(event.code)) return;

      if (currentKeyCode.current.includes(event.code)) return;

      currentKeyCode.current.push(event.code);
    });
    const removeOnKeyUp = on(Event.KEY_UP, (event: KeyboardEvent) => {
      if (currentKeyCode.current.includes(event.code)) {
        currentKeyCode.current = currentKeyCode.current.filter(
          (keyCode) => event.code !== keyCode,
        );
        setPosition((position) => ({ ...position, _update: Date.now() }));
      }
    });

    const consumedDelta = 80;
    let accDelta = 0;
    const onRemoveCustomTicker = add({
      type: TickerQueue.CUSTOM,
      onFunc: (delta: number) => {
        if (accDelta > consumedDelta) {
          switch (currentKeyCode.current[currentKeyCode.current.length - 1]) {
            case "KeyD":
              $setPosition((position) => ({ x: position.x + 1 }), "right");
              break;
            case "KeyW":
              $setPosition((position) => ({ y: position.y - 1 }), "right");
              break;
            case "KeyS":
              $setPosition((position) => ({ y: position.y + 1 }), "left");
              break;
            case "KeyA":
              $setPosition((position) => ({ x: position.x - 1 }), "left");
              break;
          }
          accDelta -= consumedDelta;
        }
        accDelta += delta;
      },
    });

    return () => {
      removeOnKeyDown();
      removeOnKeyUp();
      onRemoveCustomTicker();
    };
  }, [on, add, $setPosition, setDirection]);

  return (
    <PlayerComponent
      direction={direction}
      animation={currentKeyCode.current.length === 0 ? "idle" : "walk"}
      position={position}
    />
  );
};
