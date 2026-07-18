import React, { useMemo } from "react";
import { BlockComponent } from "shared/components";
import { getNoise } from "shared/utils";

export const MapComponent: React.FC = () => {
  const renderTerrain = useMemo(() => {
    const elements = [];
    const size = 40;

    const getN = getNoise("test");

    for (let j = -size; j < size; j++) {
      for (let k = -size; k < size; k++) {
        elements.push(
          <BlockComponent
            key={j + "_" + k}
            position={{ x: j, y: k }}
            type={getN(k, j) > 0.01 ? "grass_1" : "grass_0"}
          />,
        );
      }
    }
    return elements;
  }, []);

  return <>{renderTerrain}</>;
};
