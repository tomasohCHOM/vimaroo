import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getTestStats } from "$lib/db/stats";

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
	const username = url.toString().substring(url.toString().lastIndexOf("/") + 1);
	const profileQuery = await supabase
		.from("profiles")
		.select("*")
		.eq("username", username)
		.maybeSingle();

	if (profileQuery.error) {
		error(500, { message: profileQuery.error.message });
	}

	const profile = profileQuery.data;
	if (!profile) {
		error(404, "Not found");
	}

	const userStatsQuery = await supabase
		.from("user_stats")
		.select("*")
		.eq("user_id", profile.id)
		.single();

	if (userStatsQuery.error) {
		error(500, { message: userStatsQuery.error.message });
	}

	const stats = userStatsQuery.data;

	const overallStats = {
		testsStarted: stats.tests_started ?? 0,
		testsCompleted: stats.tests_completed ?? 0
	};

	const testStats = getTestStats(stats);

	return {
		profile: profile,
		overallStats: overallStats,
		testStats: testStats
	};
};
