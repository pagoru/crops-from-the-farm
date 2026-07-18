import React, { useEffect, useState } from "react";
import { TextComponent } from "shared/components";
import { Event, useEvents } from "@openhotel/pixi-components";

export const GuiComponent: React.FC = () => {
  const { on } = useEvents();

  const [fps, setFps] = useState<number>(0);

  useEffect(() => {
    const onRemoveFPS = on<number>(Event.FPS, (fps) => setFps(fps!));

    return () => {
      onRemoveFPS();
    };
  }, [on, setFps]);

  return (
    <>
      <TextComponent text={fps + "FPS"} />
      <TextComponent
        text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        position={{
          y: 7,
        }}
      />
    </>
  );
};
