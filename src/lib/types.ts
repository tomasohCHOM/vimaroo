export type TypeMode = {
  type: string;
  variances: number[];
};

export enum GameModes {
  WORDS = "words",
  CONTAINERS = "containers",
  RELATIVE = "relative",
  MOVEMENT = "movement",
  MIXED = "mixed",
}

export type Test = {
  initialPrompt: string;
  textBuffer: string[];
  stringCondition: string;
  joinCharacter: string;
  updateBuffer: (currentDeletePos: number | undefined) => void;
};
