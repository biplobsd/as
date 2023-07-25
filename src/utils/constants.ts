import type { UserSetting } from "./schema";

export const APP_NAME = "Addition and Subtraction";
export const VERSION = "v1.1";
export const REPO_URL = "https://github.com/biplobsd/as";
export const MODE_DEFAULT = {
  easy: {
    timeout: 20,
    numberRange: 5,
    increaseNumber: 30,
  },
  medium: {
    timeout: 10,
    numberRange: 10,
    increaseNumber: 20,
  },
  hard: {
    timeout: 5,
    numberRange: 30,
    increaseNumber: 5,
  },
};

export const USER_SETTING_DEFAULT: UserSetting = {
  ...MODE_DEFAULT.easy,
  numberPoint: 0,
  sign: "+",
  themeMode: "dark",
};
