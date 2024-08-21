import { TestType, type ContainersTest } from "$lib/test/types";
import { EXTRA_SENTENCES } from "../constants";

export const containersTest: ContainersTest = {
	type: TestType.CONTAINERS,
	prompt: "Delete the contents of the containers.",
	tip: "Tip: use di to delete inside a specific container.",
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
