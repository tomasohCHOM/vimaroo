import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase }, cookies }) => {
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
		.eq("id", user.id);

	if (err) {
		error(Number(err.code), { message: err.message });
	}

	if (userProfile && userProfile.length !== 0) {
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
		.eq("id", user.id);

	if (createdProfileErr) {
		error(Number(createdProfileErr.code), { message: createdProfileErr.message });
	}

	return {
		session,
		user,
		profile: createdProfile[0],
		cookies: cookies.getAll()
	};
};
