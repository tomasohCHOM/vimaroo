import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		error(400, "User not authenticated");
	}
	const { data, error: err } = await supabase.from("profiles").select("username").eq("id", user.id);
	if (err) {
		error(Number(err.code), { message: err.message });
	}
	if (data && data.length !== 0 && data[0].username != null) {
		redirect(303, "/");
	}
};

export const actions: Actions = {
	createUsername: async ({ request, locals: { supabase, safeGetSession } }) => {
		const { session, user } = await safeGetSession();

		if (!session || !user) {
			return fail(400, { message: "Cannot create username without being logged in" });
		}

		const data = await request.formData();
		const username = data.get("username");

		if (!username || !username.toString()) {
			return fail(400, { message: "Username not provided" });
		}

		if (username.toString().length < 3 || username.toString().length > 32) {
			return fail(400, { message: "Username should be between 3-32 characters" });
		}

		const { data: usernameInDB } = await supabase
			.from("profiles")
			.select("*")
			.eq("username", username);
		if (usernameInDB && usernameInDB.length !== 0) {
			return fail(400, { message: "Username already selected" });
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
	}
};
