type TypeMode = {
	type: string;
	variances: number[];
};

enum TestType {
	WORDS = "words",
	CONTAINERS = "containers",
	LINES = "lines",
	MOVEMENT = "movement",
	MIXED = "mixed"
}

type BaseTest = {
	initialPrompt: string;
	textBuffer: string[];
	joinCharacter: string;
	condition: (currentBuffer: string) => boolean;
	updateBuffer: () => void;
};

interface WordsTest extends BaseTest {
	type: TestType.WORDS;
	targetWord: string;
	populateWord: string;
	targetPosition: number;
}

interface ContainersTest extends BaseTest {
	type: TestType.CONTAINERS;
}

interface LinesTest extends BaseTest {
	type: TestType.LINES;
	targetWord: string;
	targetPosition: number;
}

interface MovementTest extends BaseTest {
	type: TestType.MOVEMENT;
	targetCharacter: string;
	populateCharacter: string;
	targetPosition: number;
}

interface MixedTest extends BaseTest {
	type: TestType.MIXED;
	targetWord: string;
	populateWord: string;
	targetCharacter: string;
	populateCharacter: string;
	targetPosition: number;
}

type Test = WordsTest | ContainersTest | LinesTest | MovementTest | MixedTest;

export { TestType };
export type {
	TypeMode,
	BaseTest,
	WordsTest,
	ContainersTest,
	LinesTest,
	MovementTest,
	MixedTest,
	Test
};
