import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getTestStats } from "$lib/db/stats";

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

	const testStats = getTestStats(stats);

	return {
		profile: profile[0],
		overallStats: overallStats,
		testStats: testStats
	};
};
