import {
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithRedirect,
	signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "./";

async function getProvider(name: string) {
	switch (name) {
		case "google":
			return new GoogleAuthProvider();
		case "github":
			return new GithubAuthProvider();
		default:
			throw "Unkown provider " + name;
	}
}

export async function signIn(providerName: string) {
	const provider = await getProvider(providerName);
	await signInWithRedirect(auth, provider);
}

export async function signOut() {
	await firebaseSignOut(auth);
}
