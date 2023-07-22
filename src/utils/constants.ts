import type { UserSetting } from "./schema";

export const APP_NAME = "Addition and Subscription";
export const VERSION = "v1.0";
export const REPO_URL = "https://github.com/biplobsd/as";
export const DEFAULT_REDO_FAILED_COUNT = 10;
export const MODE_DEFAULT = {
  easy: {
    timeout: 30,
    numberRange: 5,
    increaseNumber: 50,
  },
  medium: {
    timeout: 20,
    numberRange: 20,
    increaseNumber: 20,
  },
  hard: {
    timeout: 5,
    numberRange: 100,
    increaseNumber: 5,
  },
};

export const USER_SETTING_DEFAULT: UserSetting = {
  ...MODE_DEFAULT.easy,
  numberPoint: 0,
  sign: "+",
  themeMode: "dark",
};
