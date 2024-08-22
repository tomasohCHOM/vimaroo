import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { supabase, safeGetSession } }) => {
	if (request.method === "OPTIONS") {
		return new Response("");
	}

	const { session, user } = await safeGetSession();
	if (!user || !session) {
		return json({ success: false, message: "Unauthorized" }, { status: 400 });
	}

	const { data, error } = await supabase
		.from("user_stats")
		.select("tests_started")
		.eq("user_id", user.id);

	if (!data) {
		return json(500);
	}

	const testsStarted = data[0].tests_started;

	const update = await supabase
		.from("user_stats")
		.update({ tests_started: testsStarted != null ? testsStarted + 1 : 1 })
		.eq("user_id", user.id);

	if (update.error) {
		return json({ success: false, error: update.error.message }, { status: +update.error.code });
	}

	return json({ success: true });
};
