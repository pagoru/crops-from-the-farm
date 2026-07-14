import React, { PropsWithChildren, useMemo } from "react";
import { SpriteSheetEnum, TextureEnum } from "shared/enums";
import { useTextures, useUpdate } from "@openhotel/pixi-components";
import { LoaderItem } from "shared/types";
import { LoaderAssetsComponent } from "shared/components";

type Props = {} & PropsWithChildren;

export const CoreLoaderComponent: React.FC<Props> = ({ children }) => {
  const { update, lastUpdate } = useUpdate();
  const { loadSpriteSheet, loadTexture, getTexture, getSpriteSheet } =
    useTextures();

  const loaderItems = useMemo(() => {
    const spriteSheets = Object.values(SpriteSheetEnum).filter(
      (spriteSheet) => !getSpriteSheet(spriteSheet),
    );
    const textures = Object.values(TextureEnum).filter(
      (texture) => !getTexture({ texture }),
    );

    return [
      {
        label: "system.sprite_sheet_label",
        items: spriteSheets,
        func: loadSpriteSheet,
      },
      {
        label: "system.texture_label",
        items: textures,
        func: loadTexture,
      },
    ].filter((item) => item.items.length) as LoaderItem[];
  }, [loadSpriteSheet, loadTexture, getTexture, getSpriteSheet, lastUpdate]);

  return (
    <LoaderAssetsComponent
      loaderItems={loaderItems}
      children={children}
      onDone={update}
    />
  );
};
