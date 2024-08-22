import type { UserProfile } from "$lib/types/profile";
import type { LayoutServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({
	url,
	locals: { safeGetSession, supabase },
	cookies
}) => {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		return {
			session: null,
			user: null,
			profile: null,
			cookies: cookies.getAll()
		};
	}

	const { data: userProfile, error: err } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.returns<UserProfile[]>();

	if (err) {
		error(Number(err.code), { message: err.message });
	}

	if (userProfile && userProfile.length !== 0) {
		if (userProfile[0].username == null && !url.href.endsWith("account/create")) {
			redirect(303, "/account/create");
		}

		return {
			session,
			user,
			profile: userProfile[0],
			cookies: cookies.getAll()
		};
	}

	const { error: insertErr } = await supabase.from("profiles").insert({
		id: user.id,
		email: user.email,
		avatar_url: user.user_metadata.avatar_url
	});

	if (insertErr) {
		error(Number(insertErr.code), { message: insertErr.message });
	}

	const { data: createdProfile, error: createdProfileErr } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.returns<UserProfile[]>();

	if (createdProfileErr) {
		error(Number(createdProfileErr.code), { message: createdProfileErr.message });
	}

	const { data: _, error: createdUserStatsErr } = await supabase.from("user_stats").insert({
		user_id: user.id
	});

	if (createdUserStatsErr) {
		error(Number(createdUserStatsErr.code), { message: createdUserStatsErr.message });
	}

	return {
		session,
		user,
		profile: createdProfile[0],
		cookies: cookies.getAll()
	};
};
