import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { setFlash } from "sveltekit-flash-message/server";

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { user, session } = await safeGetSession();
	if (!user || !session) {
		redirect(303, "/");
	}
};

export const actions: Actions = {
	updateUsername: async ({ request, cookies, locals: { supabase, safeGetSession } }) => {
		const { user, session } = await safeGetSession();
		if (!user || !session) {
			error(401, "Unauthorized");
		}

		const data = await request.formData();
		const username = data.get("update-username");

		if (!username || !username.toString()) {
			setFlash({ type: "error", message: "Username not provided" }, cookies);
			return fail(400, { message: "Username not provided" });
		}
		if (username.toString().length < 3 || username.toString().length > 32) {
			setFlash({ type: "error", message: "Username should be between 3-32 characters" }, cookies);
			return fail(400, { message: "Username should be between 3-32 characters" });
		}

		const usernameQuery = await supabase
			.from("profiles")
			.select("*", { count: "exact" })
			.eq("username", username.toString());

		if (usernameQuery.error) {
			setFlash({ type: "error", message: "Something went wrong, please try again." }, cookies);
			return fail(500, { message: "Something went wrong, please try again." });
		}
		if (usernameQuery.count) {
			setFlash({ type: "error", message: "Username already selected." }, cookies);
			return fail(400, { message: "Username already selected." });
		}

		const updateUsernameQuery = await supabase
			.from("profiles")
			.update({
				username: username.toString()
			})
			.eq("id", user.id);
		if (updateUsernameQuery.error) {
			setFlash({ type: "error", message: updateUsernameQuery.error.message }, cookies);
			fail(500, { message: updateUsernameQuery.error.message });
		}
		setFlash({ type: "success", message: "Username updated successfully." }, cookies);
	},
	resetStats: async ({ cookies, locals: { supabase, safeGetSession } }) => {
		const { user, session } = await safeGetSession();
		if (!user || !session) {
			error(401, "Unauthorized");
		}

		const deleteStatsQuery = await supabase.from("user_stats").delete().eq("user_id", user.id);
		if (deleteStatsQuery.error) {
			setFlash({ type: "success", message: deleteStatsQuery.error.message }, cookies);
			fail(500, { message: deleteStatsQuery.error.message });
		}
		const resetStatsQuery = await supabase.from("user_stats").insert({ user_id: user.id });
		if (resetStatsQuery.error) {
			setFlash({ type: "success", message: resetStatsQuery.error.message }, cookies);
			fail(500, { message: resetStatsQuery.error.message });
		}
		setFlash({ type: "success", message: "Stats resetted successfully." }, cookies);
	},
	deleteAccount: async ({ fetch, cookies, locals: { supabase, safeGetSession } }) => {
		const { user, session } = await safeGetSession();
		if (!user || !session) {
			error(401, "Unauthorized");
		}
		// We can just delete from the profiles table since it will cascade
		// and delete the associated record in the user_stats table as well
		const deleteAccountQuery = await supabase.from("profiles").delete().eq("id", user.id);
		if (deleteAccountQuery.error) {
			setFlash({ type: "success", message: "Something went wrong, please try again." }, cookies);
			fail(500, { message: deleteAccountQuery.error.message });
		}
		// Sign out the user
		const response = await fetch("/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (!response.ok) {
			console.error("Failed to log out user.");
		}
	}
};
