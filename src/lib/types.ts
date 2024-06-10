export type TypeMode = {
  type: string;
  variances: number[];
};

export enum TestType {
  WORDS = "words",
  CONTAINERS = "containers",
  RELATIVE = "relative",
  MOVEMENT = "movement",
  MIXED = "mixed",
}

export type BaseTest = {
  initialPrompt: string;
  textBuffer: string[];
  joinCharacter: string;
  condition: (currentBuffer: string) => boolean;
  updateBuffer: () => void;
};

export interface WordsTest extends BaseTest {
  type: TestType.WORDS;
  targetWord: string;
  populateWord: string;
  targetPosition: number;
}

export interface ContainersTest extends BaseTest {
  type: TestType.CONTAINERS;
}

export interface RelativeTest extends BaseTest {
  type: TestType.RELATIVE;
  targetPosition: number;
}

export interface MovementTest extends BaseTest {
  type: TestType.MOVEMENT;
  targetPosition: number;
}

export type Test = WordsTest | ContainersTest | RelativeTest | MovementTest;
