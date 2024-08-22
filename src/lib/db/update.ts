export async function incrementTestsStarted() {
	try {
		const response = await fetch("/api/stats/increment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			console.log("Number of user tests incremented.");
		} else {
			console.error("Failed to increment tests:", await response.text());
		}
	} catch (error) {
		console.error(error);
	}
}

export async function updateStats(
	testName: string,
	deletionsCorrect: number,
	deletionsTotal: number,
	totalTime: number
) {
	try {
		const response = await fetch("api/stats/update", {
			method: "POST",
			headers: {
				"Content-Type": "applications/json"
			},
			body: JSON.stringify({ testName, deletionsCorrect, deletionsTotal, totalTime })
		});

		if (response.ok) {
			console.log("User stats updated successfully.");
		} else {
			console.error("Failed to update database:", await response.text());
		}
	} catch (error) {
		console.error(error);
	}
}
