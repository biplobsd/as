import { delay, saveToCloudUserSetting } from "src/utils/helper";
import {
  numberRangeWritable,
  signWritable,
  storeIncreaseNumberAfterWritable,
  timeWritable,
} from "src/utils/storage";
import { modeWritable } from "src/utils/writable";
import { get } from "svelte/store";

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

export async function setDefaultSetting() {
  modeWritable.set("Easy");
  signWritable.set("+");
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
