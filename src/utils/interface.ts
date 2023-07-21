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
