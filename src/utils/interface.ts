export interface Option {
  number: number;
  correct: boolean;
  btn?: any;
}
export interface QuestionPack {
  text: string;
  options: Option[];
}
