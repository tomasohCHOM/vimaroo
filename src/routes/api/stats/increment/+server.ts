import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { supabase, safeGetSession } }) => {
	if (request.method === "OPTIONS") {
		return new Response("");
	}

	const { session, user } = await safeGetSession();
	if (!user || !session) {
		return json({ success: false, message: "Unauthorized" }, { status: 400 });
	}

	const testsStartedQuery = await supabase
		.from("user_stats")
		.select("tests_started")
		.eq("user_id", user.id)
		.single();

	if (testsStartedQuery.error) {
		return json({ success: false, message: testsStartedQuery.error.message }, { status: 500 });
	}

	const testsStarted = testsStartedQuery.data.tests_started;

	const updateTestsStartedQuery = await supabase
		.from("user_stats")
		.update({ tests_started: testsStarted != null ? testsStarted + 1 : 1 })
		.eq("user_id", user.id);

	if (updateTestsStartedQuery.error) {
		return json({ success: false, error: updateTestsStartedQuery.error.message }, { status: 500 });
	}

	return json({ success: true });
};
