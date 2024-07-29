import { TestType, type ContainersTest } from "$lib/types";
import { EXTRA_SENTENCES } from "../utils";

export const containersTest: ContainersTest = {
	type: TestType.CONTAINERS,
	initialPrompt: "Delete the contents of the containers (tip: use di)",
	textBuffer: ["[", "DELETE_ME", "]"],
	joinCharacter: "",
	condition: (currentBuffer: string) => {
		const wrapper =
			containersTest.textBuffer[0] +
			containersTest.textBuffer[containersTest.textBuffer.length - 1];
		return currentBuffer.includes(wrapper);
	},
	updateBuffer: () => {
		const containerTypes = ["[]", "{}", "()", "''", '""'];
		const containerType = containerTypes[Math.floor(Math.random() * containerTypes.length)];

		containersTest.textBuffer[0] = containerType[0];
		containersTest.textBuffer[containersTest.textBuffer.length - 1] = containerType[1];
		containersTest.textBuffer[1] =
			EXTRA_SENTENCES[Math.floor(Math.random() * EXTRA_SENTENCES.length)];
	}
};
