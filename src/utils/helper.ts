import { get } from "svelte/store";
import {
  numberPointWritable,
  numberRangeWritable,
  storeIncreaseNumberAfterWritable,
} from "./storage";
import { increaseNumberAfterWritable } from "./writable";

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
