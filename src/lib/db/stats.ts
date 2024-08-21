import type { Database } from "./types";

type UserStats = Database["public"]["Tables"]["user_stats"]["Row"];
type TestStats = {
	testName: string;
	testsCompleted: number | null;
	dps: number | null;
	accuracy: number | null;
};

function calculateStats(
	testName: string,
	testsCompleted: number | null,
	deletionsTotal: number | null,
	deletionsCorrect: number | null,
	totalTime: number | null
): TestStats {
	const dps =
		deletionsCorrect != null && deletionsTotal != null ? deletionsCorrect / deletionsTotal : null;
	const accuracy =
		deletionsCorrect != null && totalTime != null ? deletionsCorrect / totalTime : null;

	return {
		testName,
		testsCompleted,
		dps,
		accuracy
	};
}

export function getTestStats(stats: UserStats) {
	const testTypes = [
		{
			testName: "horizontal",
			testsCompleted: stats.horizontal_tests_completed,
			deletionsTotal: stats.horizontal_deletions_total,
			deletionsCorrect: stats.horizontal_deletions_correct,
			totalTime: stats.horizontal_total_time
		},
		{
			testName: "containers",
			testsCompleted: stats.containers_tests_completed,
			deletionsTotal: stats.containers_deletions_total,
			deletionsCorrect: stats.containers_deletions_correct,
			totalTime: stats.containers_total_time
		},
		{
			testName: "lines",
			testsCompleted: stats.lines_tests_completed,
			deletionsTotal: stats.lines_deletions_total,
			deletionsCorrect: stats.lines_deletions_correct,
			totalTime: stats.lines_total_time
		},
		{
			testName: "movement",
			testsCompleted: stats.movement_tests_completed,
			deletionsTotal: stats.movement_deletions_total,
			deletionsCorrect: stats.movement_deletions_correct,
			totalTime: stats.movement_total_time
		},
		{
			testName: "mixed",
			testsCompleted: stats.mixed_tests_completed,
			deletionsTotal: stats.mixed_deletions_total,
			deletionsCorrect: stats.mixed_deletions_correct,
			totalTime: stats.mixed_total_time
		}
	];

	const testStats: TestStats[] = [];

	testTypes.forEach((test) => {
		testStats.push(
			calculateStats(
				test.testName,
				test.testsCompleted,
				test.deletionsTotal,
				test.deletionsCorrect,
				test.totalTime
			)
		);
	});

	return testStats;
}
