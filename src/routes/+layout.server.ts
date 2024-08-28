import type { LayoutServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { loadFlash } from "sveltekit-flash-message/server";

export const load: LayoutServerLoad = loadFlash(
	async ({ url, locals: { safeGetSession, supabase }, cookies }) => {
		const { session, user } = await safeGetSession();

		if (!session || !user) {
			return {
				session: null,
				user: null,
				profile: null,
				cookies: cookies.getAll()
			};
		}

		const userProfileQuery = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user.id)
			.maybeSingle();

		if (userProfileQuery.error) {
			error(500, { message: userProfileQuery.error.message });
		}

		const userProfile = userProfileQuery.data;

		if (userProfile) {
			if (userProfile.username == null && !url.href.endsWith("account/create")) {
				redirect(303, "/account/create");
			}

			return {
				session,
				user,
				profile: userProfile,
				cookies: cookies.getAll()
			};
		}

		const insertNewProfileQuery = await supabase
			.from("profiles")
			.insert({
				id: user.id,
				email: user.email,
				avatar_url: user.user_metadata.avatar_url
			})
			.select("*")
			.single();

		if (insertNewProfileQuery.error || !insertNewProfileQuery.data) {
			error(500, { message: insertNewProfileQuery.error.message });
		}

		const createUserStatsQuery = await supabase.from("user_stats").insert({
			user_id: user.id
		});

		if (createUserStatsQuery.error) {
			error(500, { message: createUserStatsQuery.error.message });
		}

		return {
			session,
			user,
			profile: insertNewProfileQuery.data,
			cookies: cookies.getAll()
		};
	}
);
