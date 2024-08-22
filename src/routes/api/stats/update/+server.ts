import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { supabase, safeGetSession } }) => {
	if (request.method === "OPTIONS") {
		return new Response("");
	}

	const { session, user } = await safeGetSession();
	if (!user || !session) {
		return json({ success: false, message: "Unauthorized" }, { status: 400 });
	}

	const { testName, deletionsCorrect, deletionsTotal, totalTime } = await request.json();

	console.log(testName);
	console.log(deletionsCorrect);
	console.log(deletionsTotal);
	console.log(totalTime);

	return json({ success: true });
};
