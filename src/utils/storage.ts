import { writable } from "@macfja/svelte-persistent-store";
import type { Writable } from "svelte/store";
import {
  INCREASE_NUMBER_AFTER_KEY,
  NUMBER_POINT_KEY,
  NUMBER_RANGE_KEY,
  STAR_KEY,
  THEME_MODE_KEY,
  TIMEOUT_KEY,
} from "./storage_key";
import { THEME_MODE_DEFAULT } from "./default";

// Theme switch
export const isDarkThemeWritable: Writable<string> = writable(
  THEME_MODE_KEY,
  THEME_MODE_DEFAULT
);

isDarkThemeWritable.subscribe(async (value) => {
  document.documentElement.setAttribute("data-theme", value);
});

// //

// Number Point
export const numberPointWritable: Writable<number> = writable(
  NUMBER_POINT_KEY,
  0
);
// //

// Number Point
export const storeIncreaseNumberAfterWritable: Writable<number> = writable(
  INCREASE_NUMBER_AFTER_KEY,
  5
);
// //

// Star
export const starWritable: Writable<number> = writable(STAR_KEY, 0);
// //

// Timeout
export const timeWritable: Writable<number> = writable(TIMEOUT_KEY, 5);
// //

// Number Range
export const numberRangeWritable: Writable<number> = writable(
  NUMBER_RANGE_KEY,
  5
);
// //
