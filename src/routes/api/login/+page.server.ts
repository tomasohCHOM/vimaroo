import type { Provider } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

const OAUTH_PROVIDERS = ["google", "github"];

export const actions: Actions = {
	login: async ({ url, locals: { supabase } }) => {
		const provider = url.searchParams.get("provider") as Provider;
		if (!provider) {
			return fail(422, { message: "Unable to process provider" });
		}

		if (!OAUTH_PROVIDERS.includes(provider)) {
			return fail(400, { message: "Provider not supported" });
		}
		const signInQuery = await supabase.auth.signInWithOAuth({
			provider: provider
		});

		if (signInQuery.error) {
			console.error(signInQuery.error.message);
			return fail(400, { message: "Something went wrong" });
		}

		redirect(303, signInQuery.data.url);
	}
};
