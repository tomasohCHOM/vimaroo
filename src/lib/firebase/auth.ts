import { GoogleAuthProvider, GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./";

export async function signInWithGoogle() {
	await signInWithRedirect(auth, new GoogleAuthProvider());
}

export async function signInWithGithub() {
	await signInWithRedirect(auth, new GithubAuthProvider());
}
