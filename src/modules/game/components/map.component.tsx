import React, { useMemo } from "react";
import { BlockComponent } from "shared/components";
import { getNoise } from "shared/utils";

export const MapComponent: React.FC = () => {
  const renderTerrain = useMemo(() => {
    const elements = [];
    const size = 40;

    // const getN = getNoise();
    //
    // for (let j = -size; j < size; j++) {
    //   for (let k = -size; k < size; k++) {
    //     console.log(getN(k / 100, j / 100));
    //     elements.push(
    //       <BlockComponent
    //         key={j + "_" + k}
    //         position={{ x: j, y: k }}
    //         type={getN(k / 100, j / 100) > 0.45 ? "grass_1" : "grass_0"}
    //       />,
    //     );
    //   }
    // }

    const getTempNoise = getNoise();
    const getMoistNoise = getNoise();

    const scale = 100; // Adjust this to make biomes bigger or smaller

    for (let j = -size; j < size; j++) {
      for (let k = -size; k < size; k++) {
        const temp = getTempNoise(k / scale, j / scale);
        const moist = getMoistNoise(k / scale, j / scale);

        let blockType = "grass_block"; // Default fallback

        if (temp > 0.3) {
          //jungle
          if (moist > 0.2) blockType = "grass_0";
          //desert
          else if (moist < -0.2) blockType = "path_0";
          //savanna
          else blockType = "path_0";
        }
        // else if (temp < -0.3) {
        //   //snow
        //   if (moist > 0) blockType = "snow";
        //   //tundra
        //   else blockType = "tundra";
        // }
        else {
          //forest
          if (moist > 0.3) blockType = "grass_0";
          //plains
          else blockType = "grass_1";
        }

        elements.push(
          <BlockComponent
            key={`${j}_${k}`}
            position={{ x: k, y: j }}
            type={blockType}
          />,
        );
      }
    }

    return elements;
  }, []);

  return <>{renderTerrain}</>;
};
