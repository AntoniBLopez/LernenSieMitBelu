export interface WordsTraduction {
  word: (string | number)[];
  known_by_0: string[];
  known_by_1: string[];
  known_by_2: string[];
}

export interface Topics {
  [key: string]: WordsTraduction[];
}

export interface Level {
  id: number;
  name: string;
  topics: Topics;
  created_at: string;
  updated_at: string;
}

export interface Levels {
  [key: string]: Level;
}