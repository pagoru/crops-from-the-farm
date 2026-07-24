import alea from "alea";
import { createNoise2D } from "simplex-noise";
import { getRandomString } from "./random.utils";

export const getNoise = (seed: string = getRandomString(16)) =>
  createNoise2D(alea(seed));
