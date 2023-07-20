import { get, writable } from "svelte/store";
import {
  numberPointWritable,
  storeIncreaseNumberAfterWritable,
} from "./storage";
import { getMinMax, resetINA } from "./helper";
import { type RMUser } from "./schema";

export const increaseNumberAfterWritable = writable(
  get(storeIncreaseNumberAfterWritable)
);

increaseNumberAfterWritable.subscribe((x) => {
  if (x == 0) {
    const { max } = getMinMax();
    numberPointWritable.set(max);
    resetINA();
  }
});

export const leaderboardUserCount = writable(10);
export const leaderboardRMUser = writable<RMUser[] | null>(null);
