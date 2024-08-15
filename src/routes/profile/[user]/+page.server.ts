import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals: { supabase, safeGetSession } }) => {
	const username = url.toString().substring(url.toString().lastIndexOf("/") + 1);
	const { data: profile, error: err } = await supabase
		.from("profiles")
		.select("*")
		.eq("username", username);

	if (err) {
		error(Number(err.code), { message: err.message });
	}

	if (!profile || profile.length === 0) {
		error(404, "Not found");
	}

	return {
		profile: profile[0]
	};
};
