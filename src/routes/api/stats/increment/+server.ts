import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals: { supabase, safeGetSession } }) => {
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

	console.log(testsStarted);

	const update = await supabase
		.from("user_stats")
		.update({ tests_started: testsStarted != null ? testsStarted + 1 : 1 })
		.eq("user_id", user.id);

	console.log(update);

	return json({ success: true });
};
