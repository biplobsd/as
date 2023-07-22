import { get } from "svelte/store";
import {
  isDarkThemeWritable,
  numberPointWritable,
  numberRangeWritable,
  signWritable,
  storeIncreaseNumberAfterWritable,
  timeWritable,
} from "./storage";
import { increaseNumberAfterWritable } from "./writable";
import type { UserSetting } from "./schema";
import { runtime } from "./communication";

export async function delay(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getMinMax() {
  const numberRange = get(numberRangeWritable);
  const numberPoint = get(numberPointWritable);
  const min = numberPoint;
  const max = numberPoint + numberRange;
  return { min, max };
}

export function resetINA() {
  increaseNumberAfterWritable.set(get(storeIncreaseNumberAfterWritable));
}

export function getUserSetting(): UserSetting {
  return {
    timeout: get(timeWritable),
    numberRange: get(numberRangeWritable),
    increaseNumber: get(storeIncreaseNumberAfterWritable),
    numberPoint: get(numberPointWritable),
    sign: get(signWritable),
    themeMode: get(isDarkThemeWritable),
  };
}

export function setUserSetting({
  timeout,
  increaseNumber,
  numberPoint,
  numberRange,
  sign,
  themeMode,
}: UserSetting) {
  timeWritable.set(timeout);
  numberRangeWritable.set(numberRange);
  increaseNumberAfterWritable.set(increaseNumber);
  numberPointWritable.set(numberPoint);
  signWritable.set(sign);
  isDarkThemeWritable.set(themeMode);
}

export async function saveToCloudUserSetting() {
  await runtime.send({
    type: "dataBackgroundUserSetting",
    userSetting: getUserSetting(),
    status: {
      code: "message",
      msg: "Update user setting",
    },
  });
}

export async function requestUserSetting() {
  await runtime.send({
    type: "statusBackground",
    status: {
      code: "userSetting",
      msg: "Get user setting",
    },
  });
}
