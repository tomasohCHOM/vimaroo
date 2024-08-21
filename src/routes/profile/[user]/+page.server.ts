import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

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

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
	const username = url.toString().substring(url.toString().lastIndexOf("/") + 1);
	const { data: profile, error: err } = await supabase
		.from("profiles")
		.select("*")
		.eq("username", username);

	if (err) {
		error(Number(err.code), { message: err.message });
	}

	if (!profile || profile.length === 0) {
		error(404, "Not found");
	}

	const { data: userStats, error: userStatsErr } = await supabase
		.from("user_stats")
		.select("*")
		.eq("user_id", profile[0].id);

	if (userStatsErr) {
		error(500, "Server error");
	}

	const stats = userStats[0];
	const overallStats = {
		testsStarted: stats.tests_started ?? 0,
		testsCompleted: stats.tests_completed ?? 0
	};
	const testStats: TestStats[] = [];

	testStats.push(
		calculateStats(
			"horizontal",
			stats.horizontal_tests_completed,
			stats.horizontal_deletions_total,
			stats.horizontal_deletions_correct,
			stats.horizontal_total_time
		)
	);

	testStats.push(
		calculateStats(
			"containers",
			stats.containers_tests_completed,
			stats.containers_deletions_total,
			stats.containers_deletions_correct,
			stats.containers_total_time
		)
	);

	testStats.push(
		calculateStats(
			"lines",
			stats.lines_tests_completed,
			stats.lines_deletions_total,
			stats.lines_deletions_correct,
			stats.lines_total_time
		)
	);
	testStats.push(
		calculateStats(
			"movement",
			stats.movement_tests_completed,
			stats.movement_deletions_total,
			stats.movement_deletions_correct,
			stats.movement_total_time
		)
	);
	testStats.push(
		calculateStats(
			"mixed",
			stats.mixed_tests_completed,
			stats.mixed_deletions_total,
			stats.mixed_deletions_correct,
			stats.mixed_total_time
		)
	);

	return {
		profile: profile[0],
		overallStats: overallStats,
		testStats: testStats
	};
};
