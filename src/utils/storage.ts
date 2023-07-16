import { writable } from "svelte/store";

import { THEME_MODE_KEY } from "./constants";
import { z } from "zod";
import log from "./logger";

import { THEME_MODE_DEFAULT } from "./default";

const themeSchema = z.enum(["dark", "light"]).default(THEME_MODE_DEFAULT);
const storedThemeRaw = localStorage.getItem(THEME_MODE_KEY);
const storedThemeValidated = themeSchema.safeParse(storedThemeRaw);
export const isDarkThemeWritable = writable(
  storedThemeValidated.success ? storedThemeValidated.data : THEME_MODE_DEFAULT
);

isDarkThemeWritable.subscribe(async (value) => {
  try {
    localStorage.setItem(THEME_MODE_KEY, value);
    document.documentElement.setAttribute("data-theme", value);
  } catch (error) {
    log.error(error);
    return;
  }
});
