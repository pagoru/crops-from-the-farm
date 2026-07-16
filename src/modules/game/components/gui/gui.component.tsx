import React from "react";
import { TextComponent } from "shared/components";

export const GuiComponent: React.FC = () => {
  return (
    <>
      <TextComponent text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890" />
      <TextComponent
        text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        position={{
          y: 7,
        }}
      />
    </>
  );
};
