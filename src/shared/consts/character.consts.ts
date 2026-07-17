import { CharacterAnimation } from "shared/enums";

export const CHARACTER_ANIMATIONS_SPEED: Record<CharacterAnimation, number> = {
  [CharacterAnimation.IDLE]: 0.0625,
  [CharacterAnimation.WALK]: 0.128,
  [CharacterAnimation.PICK]: 0.128,
  [CharacterAnimation.MINE]: 0.128,
  [CharacterAnimation.CHOP]: 0.128,
  [CharacterAnimation.PLOW]: 0.128,
};

export const CHARACTER_MID_SIZE = {
  x: 6,
  y: 12,
};
