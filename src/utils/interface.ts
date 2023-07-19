export interface Option {
  number: number;
  correct: boolean;
}
export interface QuestionPack {
  text: string;
  options: Option[];
}

export interface RMUser {
  displayName: string;
  photoURL: string;
  star: number;
}
