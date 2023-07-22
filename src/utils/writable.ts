import { get, writable } from "svelte/store";
import {
  numberPointWritable,
  storeIncreaseNumberAfterWritable,
} from "./storage";
import { delay, getMinMax, resetINA, saveToCloudUserSetting } from "./helper";
import { type RMUser } from "./schema";
import type { Mode } from "./types";

export const increaseNumberAfterWritable = writable(
  get(storeIncreaseNumberAfterWritable)
);

increaseNumberAfterWritable.subscribe(async (x) => {
  if (x == 0) {
    const { max } = getMinMax();
    numberPointWritable.set(max);
    resetINA();
    await delay(10);
    await saveToCloudUserSetting();
  }
});

export const leaderboardUserCount = writable(10);
export const leaderboardRMUser = writable<RMUser[] | null>(null);

export const modeWritable = writable<Mode>("Custom");
