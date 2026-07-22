import { TreeType } from "shared/enums";
import { Point, Size } from "@openhotel/pixi-components";

export const TREE_SPRITE_PIVOT_MAP: Record<TreeType, Point> = {
  [TreeType.BIG]: { x: 18, y: 43 },
  [TreeType.SMALL_1]: { x: 6, y: 29 },
  [TreeType.SMALL_2]: { x: 6, y: 29 },
};

export const TREE_SPRITE_MAP: Record<TreeType, string> = {
  [TreeType.BIG]: "tree",
  [TreeType.SMALL_1]: "small_tree_0",
  [TreeType.SMALL_2]: "small_tree_1",
};

export const TREE_MASK_MAP: Record<
  TreeType,
  { size: Size; divisions: number[]; sway: number[] }
> = {
  [TreeType.BIG]: {
    size: {
      width: 32,
      height: 48,
    },
    divisions: [8, 4, 4, 8],
    sway: [1, 0.83, 0.66, 0.5],
  },
  [TreeType.SMALL_1]: {
    size: {
      width: 20,
      height: 32,
    },
    divisions: [12, 4, 2, 2],
    sway: [1, 0.83, 0.66, 0.5],
  },
  [TreeType.SMALL_2]: {
    size: {
      width: 20,
      height: 32,
    },
    divisions: [12, 4, 2, 2],
    sway: [1, 0.83, 0.66, 0.5],
  },
};
