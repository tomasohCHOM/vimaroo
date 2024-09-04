import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		error(400, "User not authenticated");
	}

	const profileQuery = await supabase
		.from("profiles")
		.select("username")
		.eq("id", user.id)
		.single();

	if (profileQuery.error) {
		error(500, { message: profileQuery.error.message });
	}

	const profile = profileQuery.data;
	if (profile && profile.username != null) {
		redirect(303, "/");
	}
};

export const actions: Actions = {
	createAccount: async ({ request, locals: { supabase, safeGetSession } }) => {
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

		const usernameQuery = await supabase
			.from("profiles")
			.select("*", { count: "exact" })
			.eq("username", username.toString());

		if (usernameQuery.error) {
			return fail(500, { message: "Something went wrong, please try again." });
		}
		if (usernameQuery.count) {
			return fail(400, { message: "Username already selected" });
		}

		const updateUsernameQuery = await supabase
			.from("profiles")
			.update({
				username: username.toString()
			})
			.eq("id", user.id);

		if (updateUsernameQuery.error) {
			error(500, { message: updateUsernameQuery.error.message });
		}

		// Create user stats
		const createUserStatsQuery = await supabase.from("user_stats").insert({
			user_id: user.id
		});

		if (createUserStatsQuery.error) {
			error(500, { message: createUserStatsQuery.error.message });
		}

		redirect(303, "/");
	}
};
