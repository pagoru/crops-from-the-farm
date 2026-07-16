import React, { useCallback, useEffect, useRef, useState } from "react";
import { CharacterComponent } from "shared/components";
import { Event, Point, useEvents } from "@openhotel/pixi-components";
import { useTicker } from "shared/hooks";
import { TickerQueue } from "@oh/queue";
import { CustomEvent } from "shared/enums";
import { usePlayer } from "modules/game";
import { AXES_DEAD_ZONE } from "shared/consts";

type Props = {
  onChangePosition?: (position: Point) => void;
};

export const PlayerComponent: React.FC<Props> = ({ onChangePosition }) => {
  const { on } = useEvents();
  const { add } = useTicker();
  const { position, setPosition } = usePlayer();

  const currentController = useRef<"keyboard" | "gamepad">("keyboard");
  const currentKeyCode = useRef([]);
  const currentGamepad = useRef<Gamepad>(null);

  const [movement, setMovement] = useState<boolean>(false);
  const [direction, setDirection] = useState<"right" | "left">("right");

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
    const removeOnGamepadConnected = on(
      CustomEvent.GAMEPAD_CONNECTED,
      (gamepad: Gamepad) => {
        if (currentGamepad.current) return;
        currentGamepad.current = gamepad;
      },
    );
    const removeOnGamepadDisconnected = on(
      CustomEvent.GAMEPAD_DISCONNECTED,
      (gamepad: Gamepad) => {
        if (currentGamepad.current.id !== gamepad.id) return;
        currentGamepad.current = null;
      },
    );

    const removeOnKeyDown = on(Event.KEY_DOWN, (event: KeyboardEvent) => {
      if (!["KeyW", "KeyD", "KeyA", "KeyS"].includes(event.code)) return;

      if (currentKeyCode.current.includes(event.code)) return;

      currentController.current = "keyboard";
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
          let direction = null;

          if (currentGamepad.current) {
            // Axis 0 = Left/Right, Axis 1 = Up/Down
            const x = currentGamepad.current.axes[0];
            const y = currentGamepad.current.axes[1];
            // Both axes must exceed the deadzone to qualify as a diagonal
            const distance = Math.sqrt(x * x + y * y);

            if (distance >= AXES_DEAD_ZONE) {
              if (Math.abs(x) >= Math.abs(y)) {
                if (x > 0) {
                  direction = y < 0 ? "top-right" : "bottom-right";
                } else {
                  direction = y < 0 ? "top-left" : "bottom-left";
                }
              } else {
                if (y > 0) {
                  direction = x < 0 ? "bottom-left" : "bottom-right";
                } else {
                  direction = x < 0 ? "top-left" : "top-right";
                }
              }
            }
          }
          if (direction === null)
            direction = {
              KeyD: "bottom-right",
              KeyW: "top-right",
              KeyS: "bottom-left",
              KeyA: "top-left",
            }[currentKeyCode.current[currentKeyCode.current.length - 1]];

          switch (direction) {
            case "bottom-right":
              $setPosition((position) => ({ x: position.x + 1 }), "right");
              break;
            case "top-right":
              $setPosition((position) => ({ y: position.y - 1 }), "right");
              break;
            case "bottom-left":
              $setPosition((position) => ({ y: position.y + 1 }), "left");
              break;
            case "top-left":
              $setPosition((position) => ({ x: position.x - 1 }), "left");
              break;
          }
          setMovement(Boolean(direction));
          accDelta -= consumedDelta;
        }
        accDelta += delta;
      },
    });

    return () => {
      removeOnKeyDown();
      removeOnKeyUp();
      removeOnGamepadConnected();
      removeOnGamepadDisconnected();
      onRemoveCustomTicker();
    };
  }, [on, add, $setPosition, setDirection, setMovement]);

  return (
    <CharacterComponent
      direction={direction}
      animation={movement ? "walk" : "idle"}
      position={position}
    />
  );
};
