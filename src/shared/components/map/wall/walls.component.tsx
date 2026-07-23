import React, { useMemo } from "react";
import { Point } from "@openhotel/pixi-components";
import { Direction, WallType } from "shared/enums";
import { WallComponent } from "shared/components";
import { getCrossDirectionFromDirection } from "shared/utils";

type Wall = {
  direction: Direction;
  type?: WallType;
};

type Props = {
  position?: Partial<Point>;
  walls: Wall[];
};

export const WallsComponent: React.FC<Props> = ({
  position = { x: 0, y: 0 },
  walls,
}) => {
  return useMemo(() => {
    const list = [];

    let index = 0;
    let nextPosition = { x: 0, y: 0, ...position };
    let lastDirection;
    for (const wall of walls) {
      if (index > 0)
        switch (wall.direction) {
          case Direction.NORTH:
            nextPosition.y -= 4 - (wall.direction !== lastDirection ? 2 : 0);
            nextPosition.x += wall.direction !== lastDirection ? 2 : 0;
            break;
          case Direction.EAST:
            nextPosition.x -= 4 - (wall.direction !== lastDirection ? 2 : 0);
            nextPosition.y -= wall.direction !== lastDirection ? 2 : 0;
            break;
          case Direction.SOUTH:
            nextPosition.y += 4 - (wall.direction !== lastDirection ? 2 : 0);
            nextPosition.x -= wall.direction !== lastDirection ? 2 : 0;
            break;
          case Direction.WEST:
            nextPosition.x += 4 - (wall.direction !== lastDirection ? 2 : 0);
            nextPosition.y += wall.direction !== lastDirection ? 2 : 0;
            break;
        }
      const direction = getCrossDirectionFromDirection(wall.direction);
      if (wall.type !== WallType.NONE)
        list.push(
          <WallComponent
            key={`wall_${index}`}
            type={wall.type}
            position={{ ...nextPosition }}
            direction={direction}
          />,
        );
      lastDirection = wall.direction;
      index++;
    }
    return list;
  }, [walls, position]);
};
