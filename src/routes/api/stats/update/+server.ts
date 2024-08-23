import { json, type RequestHandler } from "@sveltejs/kit";

const horizontalStatsColumns =
	"horizontal_tests_completed, horizontal_deletions_total, horizontal_deletions_correct, horizontal_total_time";
const containersStatsColumns =
	"containers_tests_completed, containers_deletions_total, containers_deletions_correct, containers_total_time";
const linesStatsColumns =
	"lines_tests_completed, lines_deletions_total, lines_deletions_correct, lines_total_time";
const movementStatsColumns =
	"movement_tests_completed, movement_deletions_total, movement_deletions_correct, movement_total_time";
const mixedStatsColumns =
	"mixed_tests_completed, mixed_deletions_total, mixed_deletions_correct, mixed_total_time";

export const POST: RequestHandler = async ({ request, locals: { supabase, safeGetSession } }) => {
	if (request.method === "OPTIONS") {
		return new Response("");
	}

	const { session, user } = await safeGetSession();
	if (!user || !session) {
		return json({ success: false, message: "Unauthorized" }, { status: 400 });
	}

	const { testName, deletionsCorrect, deletionsTotal, totalTime } = await request.json();

	if (
		typeof testName != "string" ||
		typeof deletionsCorrect !== "number" ||
		typeof deletionsTotal !== "number" ||
		typeof totalTime !== "number"
	) {
		return json({ success: false, error: "Invalid input data." }, { status: 500 });
	}

	const testsTotalQuery = await supabase
		.from("user_stats")
		.select("tests_started, tests_completed")
		.eq("user_id", user.id)
		.single();

	if (testsTotalQuery.error || !testsTotalQuery.data) {
		return json({ success: false, error: testsTotalQuery.error.message }, { status: 500 });
	}

	const testsStarted = testsTotalQuery.data.tests_started;
	const testsCompleted = testsTotalQuery.data.tests_completed;

	const updateTestsTotalQuery = await supabase
		.from("user_stats")
		.update({
			tests_started: testsStarted ? testsStarted + 1 : 1,
			tests_completed: testsCompleted ? testsCompleted + 1 : 1
		})
		.eq("user_id", user.id);

	if (updateTestsTotalQuery.error) {
		return json({ success: false, error: updateTestsTotalQuery.error.message }, { status: 500 });
	}

	switch (testName) {
		case "horizontal":
			const horizontalStats = await supabase
				.from("user_stats")
				.select(horizontalStatsColumns)
				.eq("user_id", user.id)
				.single();

			if (horizontalStats.error) {
				return json({ success: false, error: horizontalStats.error.message }, { status: 500 });
			}
			if (!horizontalStats.data) {
				return json({ sucess: false, error: "Failed retrieving user stats." }, { status: 500 });
			}

			const horizontalTestsCompleted = horizontalStats.data.horizontal_tests_completed;
			const horizontalDeletionsCorrect = horizontalStats.data.horizontal_deletions_correct;
			const horizontalDeletionsTotal = horizontalStats.data.horizontal_deletions_total;
			const horizontalTotalTime = horizontalStats.data.horizontal_total_time;

			const updateHorizontalStatsResult = await supabase
				.from("user_stats")
				.update({
					horizontal_tests_completed: horizontalTestsCompleted ? horizontalTestsCompleted + 1 : 1,
					horizontal_deletions_correct: horizontalDeletionsCorrect
						? horizontalDeletionsCorrect + deletionsCorrect
						: deletionsCorrect,
					horizontal_deletions_total: horizontalDeletionsTotal
						? horizontalDeletionsTotal + deletionsTotal
						: deletionsTotal,
					horizontal_total_time: horizontalTotalTime ? horizontalTotalTime + totalTime : totalTime
				})
				.eq("user_id", user.id);

			if (updateHorizontalStatsResult.error) {
				return json(
					{ sucess: false, error: updateHorizontalStatsResult.error.message },
					{ status: 500 }
				);
			}

			break;
		case "containers":
			const containersStats = await supabase
				.from("user_stats")
				.select(containersStatsColumns)
				.eq("user_id", user.id)
				.single();

			if (containersStats.error) {
				return json({ success: false, error: containersStats.error.message }, { status: 500 });
			}
			if (!containersStats.data) {
				return json({ sucess: false, error: "Failed retrieving user stats." }, { status: 500 });
			}

			const containersTestsCompleted = containersStats.data.containers_tests_completed;
			const containersDeletionsCorrect = containersStats.data.containers_deletions_correct;
			const containersDeletionsTotal = containersStats.data.containers_deletions_total;
			const containersTotalTime = containersStats.data.containers_total_time;

			const updateContainersStatsResult = await supabase
				.from("user_stats")
				.update({
					containers_tests_completed: containersTestsCompleted ? containersTestsCompleted + 1 : 1,
					containers_deletions_correct: containersDeletionsCorrect
						? containersDeletionsCorrect + deletionsCorrect
						: deletionsCorrect,
					containers_deletions_total: containersDeletionsTotal
						? containersDeletionsTotal + deletionsTotal
						: deletionsTotal,
					containers_total_time: containersTotalTime ? containersTotalTime + totalTime : totalTime
				})
				.eq("user_id", user.id);

			if (updateContainersStatsResult.error) {
				return json(
					{ sucess: false, error: updateContainersStatsResult.error.message },
					{ status: 500 }
				);
			}

			break;
		case "lines":
			const linesStats = await supabase
				.from("user_stats")
				.select(linesStatsColumns)
				.eq("user_id", user.id)
				.single();

			if (linesStats.error) {
				return json({ success: false, error: linesStats.error.message }, { status: 500 });
			}
			if (!linesStats.data) {
				return json({ sucess: false, error: "Failed retrieving user stats." }, { status: 500 });
			}

			const linesTestsCompleted = linesStats.data.lines_tests_completed;
			const linesDeletionsCorrect = linesStats.data.lines_deletions_correct;
			const linesDeletionsTotal = linesStats.data.lines_deletions_total;
			const linesTotalTime = linesStats.data.lines_total_time;

			const updateLinesStatsResult = await supabase
				.from("user_stats")
				.update({
					lines_tests_completed: linesTestsCompleted ? linesTestsCompleted + 1 : 1,
					lines_deletions_correct: linesDeletionsCorrect
						? linesDeletionsCorrect + deletionsCorrect
						: deletionsCorrect,
					lines_deletions_total: linesDeletionsTotal
						? linesDeletionsTotal + deletionsTotal
						: deletionsTotal,
					lines_total_time: linesTotalTime ? linesTotalTime + totalTime : totalTime
				})
				.eq("user_id", user.id);

			if (updateLinesStatsResult.error) {
				return json(
					{ sucess: false, error: updateLinesStatsResult.error.message },
					{ status: 500 }
				);
			}

			break;
		case "movement":
			const movementStats = await supabase
				.from("user_stats")
				.select(movementStatsColumns)
				.eq("user_id", user.id)
				.single();

			if (movementStats.error) {
				return json({ success: false, error: movementStats.error.message }, { status: 500 });
			}
			if (!movementStats.data) {
				return json({ sucess: false, error: "Failed retrieving user stats." }, { status: 500 });
			}

			const movementTestsCompleted = movementStats.data.movement_tests_completed;
			const movementDeletionsCorrect = movementStats.data.movement_deletions_correct;
			const movementDeletionsTotal = movementStats.data.movement_deletions_total;
			const movementTotalTime = movementStats.data.movement_total_time;

			const updateMovementStatsResult = await supabase
				.from("user_stats")
				.update({
					movement_tests_completed: movementTestsCompleted ? movementTestsCompleted + 1 : 1,
					movement_deletions_correct: movementDeletionsCorrect
						? movementDeletionsCorrect + deletionsCorrect
						: deletionsCorrect,
					movement_deletions_total: movementDeletionsTotal
						? movementDeletionsTotal + deletionsTotal
						: deletionsTotal,
					movement_total_time: movementTotalTime ? movementTotalTime + totalTime : totalTime
				})
				.eq("user_id", user.id);

			if (updateMovementStatsResult.error) {
				return json(
					{ sucess: false, error: updateMovementStatsResult.error.message },
					{ status: 500 }
				);
			}

			break;
		case "mixed":
			const mixedStats = await supabase
				.from("user_stats")
				.select(mixedStatsColumns)
				.eq("user_id", user.id)
				.single();

			if (mixedStats.error) {
				return json({ success: false, error: mixedStats.error.message }, { status: 500 });
			}
			if (!mixedStats.data) {
				return json({ sucess: false, error: "Failed retrieving user stats." }, { status: 500 });
			}

			const mixedTestsCompleted = mixedStats.data.mixed_tests_completed;
			const mixedDeletionsCorrect = mixedStats.data.mixed_deletions_correct;
			const mixedDeletionsTotal = mixedStats.data.mixed_deletions_total;
			const mixedTotalTime = mixedStats.data.mixed_total_time;

			const updateMixedStatsResult = await supabase
				.from("user_stats")
				.update({
					mixed_tests_completed: mixedTestsCompleted ? mixedTestsCompleted + 1 : 1,
					mixed_deletions_correct: mixedDeletionsCorrect
						? mixedDeletionsCorrect + deletionsCorrect
						: deletionsCorrect,
					mixed_deletions_total: mixedDeletionsTotal
						? mixedDeletionsTotal + deletionsTotal
						: deletionsTotal,
					mixed_total_time: mixedTotalTime ? mixedTotalTime + totalTime : totalTime
				})
				.eq("user_id", user.id);

			if (updateMixedStatsResult.error) {
				return json(
					{ sucess: false, error: updateMixedStatsResult.error.message },
					{ status: 500 }
				);
			}

			break;
		default:
			return json({ sucess: false, error: "Invalid test" }, { status: 400 });
	}

	return json({ success: true });
};
