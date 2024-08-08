export interface Word {
  value: (string | number)[];
}

export interface WordsTraduction {
  word: (string | number)[];
}

export interface Topics {
  [key: string]: WordsTraduction[];
}

export interface Level {
  id: number;
  level: string;
  topics: Topics;
  created_at: string;
  updated_at: string;
}

export interface Levels extends Array<Level> { }

export type CSSPropertiesWithVariables = React.CSSProperties & {
  '--percentage'?: number;
  '--color1'?: string;
  '--color2'?: string;
}