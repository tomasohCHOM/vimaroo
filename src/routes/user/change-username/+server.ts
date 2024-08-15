import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		error(400, "Cannot create username without being logged in");
	}

	const data = await request.formData();
	const username = data.get("username");

	if (!username || !username.toString()) {
		error(400, "Username not provided");
	}

	const { error: err } = await supabase
		.from("profiles")
		.update({
			username: username.toString()
		})
		.eq("id", user.id);

	if (err) {
		error(Number(err.code), { message: err.message });
	}

	redirect(303, "/");
};
