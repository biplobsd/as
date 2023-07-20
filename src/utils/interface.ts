export interface Option {
  number: number;
  correct: boolean;
}
export interface QuestionPack {
  text: string;
  options: Option[];
}
