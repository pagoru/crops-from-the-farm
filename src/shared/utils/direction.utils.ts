import { CrossDirection, Direction } from "shared/enums";

export const getCrossDirectionFromDirection = (
  direction: Direction,
): CrossDirection => {
  switch (direction) {
    case Direction.NORTH:
    case Direction.SOUTH:
      return CrossDirection.NORTH_SOUTH;
    case Direction.EAST:
    case Direction.WEST:
      return CrossDirection.EAST_WEST;
  }
};
