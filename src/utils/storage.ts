import { writable } from "@macfja/svelte-persistent-store";
import type { Writable } from "svelte/store";
import {
  INCREASE_NUMBER_AFTER_KEY,
  LOGIN_KEY,
  NUMBER_POINT_KEY,
  NUMBER_RANGE_KEY,
  SIGN_KEY,
  STAR_KEY,
  THEME_MODE_KEY,
  TIMEOUT_KEY,
  TYPE_KEY,
} from "./storage_key";
import type { Sign, Theme } from "./schema";
import { USER_SETTING_DEFAULT as us } from "src/utils/constants";

// Theme switch
export const isDarkThemeWritable: Writable<Theme> = writable(
  THEME_MODE_KEY,
  us.themeMode
);
// //

// Number Point
export const numberPointWritable: Writable<number> = writable(
  NUMBER_POINT_KEY,
  us.numberPoint
);

// //

// Increase Number After
export const storeIncreaseNumberAfterWritable: Writable<number> = writable(
  INCREASE_NUMBER_AFTER_KEY,
  us.increaseNumber
);
// //

// Star
export const starWritable: Writable<number> = writable(STAR_KEY, 0);
// //

// Timeout
export const timeWritable: Writable<number> = writable(TIMEOUT_KEY, us.timeout);
// //

// Number Range
export const numberRangeWritable: Writable<number> = writable(
  NUMBER_RANGE_KEY,
  us.numberRange
);
// //

// Sign
export const signWritable: Writable<Sign> = writable(SIGN_KEY, us.sign);
// //

// Type
export const typeWritable: Writable<boolean> = writable(TYPE_KEY, us.type);
// //

// Mode
export const isUserLoggedWritable: Writable<boolean> = writable(
  LOGIN_KEY,
  false
);
