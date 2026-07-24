import React, { useMemo } from "react";
import {
  BlockComponent,
  ElectricalPostsComponent,
  HedgeComponent,
  TreeComponent,
  WallComponent,
  WeedsComponent,
} from "shared/components";
import { getNoise, getRandomNumber } from "shared/utils";
import { CrossDirection, Direction, TreeType } from "shared/enums";

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
              x: j * getRandomNumber(10, 16) + 20,
              y: k * getRandomNumber(10, 16) + 20,
            }}
          />,
        );
      }
    }
    return list;
  }, []);

  const renderWeeds = useMemo(() => {
    const list = [];
    for (let j = 1; j < 6; j++) {
      for (let k = 1; k < 6; k++) {
        list.push(
          <WeedsComponent
            key={j + "_" + k + "weed"}
            position={{
              x: j * getRandomNumber(10, 16) + 20,
              y: k * getRandomNumber(10, 16) + 20,
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
      {renderWeeds}
      <WallComponent direction={Direction.NORTH} position={{ x: 0 }} />
      <WallComponent direction={Direction.SOUTH} position={{ x: 0 }} />
      <WallComponent direction={Direction.EAST} position={{ x: 0 }} />
      <WallComponent direction={Direction.WEST} position={{ x: 0 }} />
      <WallComponent direction={Direction.WEST} position={{ x: 2 }} />
      <WallComponent direction={Direction.WEST} position={{ x: 4 }} />
      {/*<WallsComponent*/}
      {/*  walls={[*/}
      {/*    {*/}
      {/*      direction: Direction.SOUTH,*/}
      {/*      type: WallType.TALL,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      direction: Direction.SOUTH,*/}
      {/*      type: WallType.TALL,*/}
      {/*    },*/}
      {/*    // {*/}
      {/*    //   direction: Direction.EAST,*/}
      {/*    //   type: WallType.TALL,*/}
      {/*    // },*/}
      {/*    // {*/}
      {/*    //   direction: Direction.EAST,*/}
      {/*    //   type: WallType.NONE,*/}
      {/*    // },*/}
      {/*    // {*/}
      {/*    //   direction: Direction.EAST,*/}
      {/*    //   type: WallType.TALL,*/}
      {/*    // },*/}
      {/*    // {*/}
      {/*    //   direction: Direction.SOUTH,*/}
      {/*    // },*/}
      {/*    // {*/}
      {/*    //   direction: Direction.SOUTH,*/}
      {/*    // },*/}
      {/*    // {*/}
      {/*    //   direction: Direction.WEST,*/}
      {/*    // },*/}
      {/*    // {*/}
      {/*    //   direction: Direction.WEST,*/}
      {/*    // },*/}
      {/*    // {*/}
      {/*    //   direction: Direction.NORTH,*/}
      {/*    //   type: WallType.TALL,*/}
      {/*    // },*/}
      {/*  ]}*/}
      {/*/>*/}
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
              position: { x: 0, y: -40 },
            },
            {
              position: { x: 0, y: -10 },
            },
            {
              position: { x: 0, y: 20 },
            },
            {
              position: { x: 40, y: 60 },
              direction: CrossDirection.EAST_WEST,
            },
            {
              position: { x: 90, y: 60 },
              direction: CrossDirection.EAST_WEST,
            },
            {
              position: { x: 150, y: 60 },
              direction: CrossDirection.EAST_WEST,
            },
          ]}
        />
      }
    </>
  );
};
