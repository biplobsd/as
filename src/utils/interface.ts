import type { Sign, ThemeMode } from "./types";

export interface Option {
  number: number;
  correct: boolean;
  btn?: any;
}
export interface QuestionPack {
  text: string;
  options: Option[];
}

export interface TooltipItem {
  text: string;
  img: string;
  imgAlt: string;
}

export interface UserSetting {
  timeout: number;
  numberRange: number;
  increaseNumber: number;
  numberPoint: number;
  sign: Sign;
  themeMode: ThemeMode;
}
