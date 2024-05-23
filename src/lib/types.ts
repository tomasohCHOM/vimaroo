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
