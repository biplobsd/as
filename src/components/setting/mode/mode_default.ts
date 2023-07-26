import { MODE_DEFAULT } from "src/utils/constants";
import { THEME_MODE_DEFAULT } from "src/utils/default";
import { delay, saveToCloudUserSetting } from "src/utils/helper";
import {
  isDarkThemeWritable,
  numberPointWritable,
  numberRangeWritable,
  signWritable,
  starWritable,
  storeIncreaseNumberAfterWritable,
  timeWritable,
  typeWritable,
} from "src/utils/storage";
import { modeWritable } from "src/utils/writable";
import { get } from "svelte/store";

export function setOptionDefault() {
  modeWritable.set("Easy");
  signWritable.set("+");
  typeWritable.set(false);
}

export async function setDefaultUserSetting() {
  setOptionDefault();
  isDarkThemeWritable.set(THEME_MODE_DEFAULT);
  starWritable.set(0);
  numberPointWritable.set(0);
}

export async function setDefaultSetting() {
  setOptionDefault();
  await delay(10);
  await saveToCloudUserSetting();
}

export function checkIsInMode() {
  const timeout = get(timeWritable);
  const nr = get(numberRangeWritable);
  const inn = get(storeIncreaseNumberAfterWritable);
  const { easy, medium, hard } = MODE_DEFAULT;
  if (
    timeout === easy.timeout &&
    nr === easy.numberRange &&
    inn === easy.increaseNumber
  ) {
    modeWritable.set("Easy");
  } else if (
    timeout === medium.timeout &&
    nr === medium.numberRange &&
    inn === medium.increaseNumber
  ) {
    modeWritable.set("Medium");
  } else if (
    timeout === hard.timeout &&
    nr === hard.numberRange &&
    inn === hard.increaseNumber
  ) {
    modeWritable.set("Hard");
  } else {
    modeWritable.set("Custom");
  }
}
