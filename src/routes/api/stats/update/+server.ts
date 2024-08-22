import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
	const { testType, deletionsCorrect, deletionsTotal, totalTime } = await request.json();
	return json({ success: true });
};
