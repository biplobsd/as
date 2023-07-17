import { writable } from "@macfja/svelte-persistent-store";
import type { Writable } from "svelte/store";
import { STAR_KEY, THEME_MODE_KEY, TIMEOUT_KEY } from "./constants";
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

// Star
export const starWritable: Writable<number> = writable(STAR_KEY, 0);
// //

// Timeout
export const timeWritable: Writable<number> = writable(TIMEOUT_KEY, 5);
// //
