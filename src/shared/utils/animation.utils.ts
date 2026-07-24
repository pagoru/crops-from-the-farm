export const getSwayAnimation = (time: number, amplitude: number, seed = 0) =>
  Math.sin(time + seed) * amplitude;
