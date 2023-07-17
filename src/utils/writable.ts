import { get, writable } from "svelte/store";
import { storeIncreaseNumberAfterWritable } from "./storage";

export const increaseNumberAfterWritable = writable(
  get(storeIncreaseNumberAfterWritable)
);
