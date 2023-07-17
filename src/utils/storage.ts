import { writable } from "@macfja/svelte-persistent-store";
import type { Writable } from "svelte/store";
import { THEME_MODE_KEY } from "./constants";
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
