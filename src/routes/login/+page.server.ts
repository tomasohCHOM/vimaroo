import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { fail, type Actions } from "@sveltejs/kit";
import { auth } from "$lib/firebase";

export const actions: Actions = {
	login: async ({ url }) => {
		const provider = url.searchParams.get("provider");
		switch (provider) {
			case "google":
				await signInWithRedirect(auth, new GoogleAuthProvider());
				break;
			case "github":
				await signInWithRedirect(auth, new GithubAuthProvider());
				break;
			default:
				return fail(400, { message: "Provider not supported." });
		}
	}
};
