import React, { useMemo } from "react";
import {
  BlockComponent,
  ElectricalPostsComponent,
  HedgeComponent,
  TreeComponent,
} from "shared/components";
import { getNoise, getRandomNumber } from "shared/utils";
import { ElectricalPostDirection, TreeType } from "shared/enums";

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
            key={`block_${j}_${k}`}
            position={{ x: k, y: j }}
            type={blockType}
          />,
        );
      }
    }

    return elements;
  }, []);

  const renderTrees = useMemo(() => {
    const list = [];
    // let j = 0;
    // let k = 0;
    const treeTypes = Object.keys(TreeType);
    for (let j = 1; j < 6; j++) {
      for (let k = 1; k < 6; k++) {
        const type = treeTypes[
          getRandomNumber(0, treeTypes.length - 1)
        ] as TreeType;
        list.push(
          <TreeComponent
            type={type}
            key={j + "_" + k + "tree" + type}
            position={{
              x: j * getRandomNumber(10, 16),
              y: k * getRandomNumber(10, 16),
            }}
          />,
        );
      }
    }
    return list;
  }, []);

  return (
    <>
      {renderTerrain}
      {renderTrees}
      <HedgeComponent position={{ y: 2 }} />
      <HedgeComponent
        position={{
          x: 1,
          y: 2,
        }}
        type={1}
      />
      <HedgeComponent
        position={{
          x: 2,
          y: 2,
        }}
        type={2}
      />
      <HedgeComponent
        position={{
          x: 3,
          y: 2,
        }}
        type={3}
      />
      <BlockComponent />
      {
        <ElectricalPostsComponent
          posts={[
            {
              position: { x: 0, y: -30 },
            },
            {
              position: { x: -5, y: -10 },
            },
            {
              position: { x: 0, y: 10 },
            },
            {
              position: { x: 40, y: 40 },
              direction: ElectricalPostDirection.EAST_WEST,
            },
            {
              position: { x: 80, y: 50 },
              direction: ElectricalPostDirection.EAST_WEST,
            },
          ]}
        />
      }
    </>
  );
};
