import { get, writable } from "svelte/store";
import {
  numberPointWritable,
  storeIncreaseNumberAfterWritable,
} from "./storage";
import { getMinMax, resetINA } from "./helper";

export const increaseNumberAfterWritable = writable(
  get(storeIncreaseNumberAfterWritable)
);

increaseNumberAfterWritable.subscribe((x) => {
  if (x == 0) {
    const { min, max } = getMinMax();
    console.log("max", max, "min", min, "x", x);
    numberPointWritable.set(max);
    resetINA();
  }
});

export const leaderboardUserCount = writable(10);
