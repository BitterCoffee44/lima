import { getAuth, onAuthStateChanged } from "@firebase/auth";
import firebaseApp from "../clientApp";

export async function isAuth() {
  return false;
}

export async function logOutAdmin() {
  const auth = getAuth(firebaseApp);
  await auth.signOut();

  return { status: true };
}
