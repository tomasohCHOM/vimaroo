import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { user, session } = await safeGetSession();
	if (!user || !session) {
		redirect(303, "/");
	}
};

export const actions: Actions = {
	updateUsername: async ({ request, locals: { supabase, safeGetSession } }) => {
		const { user, session } = await safeGetSession();
		if (!user || !session) {
			error(401, "Unauthorized");
		}

		const data = await request.formData();
		const username = data.get("update-username");

		if (!username || !username.toString()) {
			return error(400, { message: "Username not provided" });
		}
		if (username.toString().length < 3 || username.toString().length > 32) {
			return error(400, { message: "Username should be between 3-32 characters" });
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
		redirect(303, "/");
	},
	resetStats: async ({ locals: { supabase, safeGetSession } }) => {
		const { user, session } = await safeGetSession();
		if (!user || !session) {
			error(401, "Unauthorized");
		}

		const deleteStatsQuery = await supabase.from("user_stats").delete().eq("user_id", user.id);
		if (deleteStatsQuery.error) {
			error(500, { message: deleteStatsQuery.error.message });
		}
		const resetStatsQuery = await supabase.from("user_stats").insert({ user_id: user.id });
		if (resetStatsQuery.error) {
			error(500, { message: resetStatsQuery.error.message });
		}
		redirect(303, "/");
	},
	deleteAccount: async ({ fetch, locals: { supabase, safeGetSession } }) => {
		const { user, session } = await safeGetSession();
		if (!user || !session) {
			error(401, "Unauthorized");
		}
		// We can just delete from the profiles table since it will cascade
		// and delete the associated record in the user_stats table as well
		const deleteAccountQuery = await supabase.from("profiles").delete().eq("id", user.id);
		if (deleteAccountQuery.error) {
			console.error(deleteAccountQuery.error);
			error(500, { message: deleteAccountQuery.error.message });
		}
		// Sign out the user
		const response = await fetch("/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
};
