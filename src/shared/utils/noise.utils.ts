import alea from "alea";
import { createNoise2D } from "simplex-noise";

export const getNoise = (seed: string = "crops") => createNoise2D(alea(seed));
