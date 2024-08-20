import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

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

	const testStats = [];
	const userStat = userStats[0];

	if (!userStat) {
		return {
			profile: profile[0],
			testStats: []
		};
	}

	const horizontalDps =
		userStat.horizontal_deletions_correct != null && userStat.horizontal_total_time
			? userStat.horizontal_deletions_correct / userStat.horizontal_total_time
			: null;

	const horizontalAccuracy =
		userStat.horizontal_deletions_total != null && userStat.horizontal_deletions_correct != null
			? (userStat.horizontal_deletions_correct / userStat.horizontal_deletions_total) * 100
			: null;

	testStats.push({
		name: "horizontal",
		testsCompleted: userStat.horizontal_tests_completed,
		dps: horizontalDps,
		accuracy: horizontalAccuracy
	});

	return {
		profile: profile[0],
		testStats: testStats
	};
};
