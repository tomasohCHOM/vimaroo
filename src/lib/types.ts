type TypeMode = {
	type: string;
	variances: number[];
};

enum TestType {
	HORIZONTAL = "horizontal",
	CONTAINERS = "containers",
	LINES = "lines",
	MOVEMENT = "movement",
	MIXED = "mixed"
}

type BaseTest = {
	prompt: string;
	tip?: string;
	textBuffer: string[];
	joinCharacter: string;
	condition: (currentBuffer: string) => boolean;
	updateBuffer: () => void;
};

interface HorizontalTest extends BaseTest {
	type: TestType.HORIZONTAL;
	targetCharacter: string;
	populateWord: string;
	targetPosition: number;
}

interface ContainersTest extends BaseTest {
	type: TestType.CONTAINERS;
}

interface LinesTest extends BaseTest {
	type: TestType.LINES;
	targetLine: string;
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
	targetLine: string;
	populateWord: string;
	targetCharacter: string;
	populateCharacter: string;
	targetPosition: number;
}

type Test = HorizontalTest | ContainersTest | LinesTest | MovementTest | MixedTest;

export { TestType };
export type {
	TypeMode,
	BaseTest,
	HorizontalTest,
	ContainersTest,
	LinesTest,
	MovementTest,
	MixedTest,
	Test
};
