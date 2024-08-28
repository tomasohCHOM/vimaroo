import { TestType } from "$lib/types/test";
import type { Test } from "$lib/types/test";
import { horizontalTest } from "./horizontal";
import { containersTest } from "./containers";
import { linesTest } from "./lines";
import { movementTest } from "./movement";
import { mixedTest } from "./mixed";

export function handleTestModeChange(testMode: string): Test {
	switch (testMode) {
		case TestType.HORIZONTAL:
			return horizontalTest;
		case TestType.CONTAINERS:
			return containersTest;
		case TestType.LINES:
			return linesTest;
		case TestType.MOVEMENT:
			return movementTest;
		case TestType.MIXED:
			return mixedTest;
	}
	return horizontalTest;
}
