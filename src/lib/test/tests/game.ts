import { TestType } from "$lib/types";
import type { Test } from "$lib/types";
import { wordTest } from "./words";
import { containersTest } from "./containers";
import { linesTest } from "./lines";
import { movementTest } from "./movement";
import { mixedTest } from "./mixed";

export function handleGameModeChange(gameMode: string): Test {
	switch (gameMode) {
		case TestType.WORDS:
			return wordTest;
		case TestType.CONTAINERS:
			return containersTest;
		case TestType.LINES:
			return linesTest;
		case TestType.MOVEMENT:
			return movementTest;
		case TestType.MIXED:
			return mixedTest;
	}
	return wordTest;
}
