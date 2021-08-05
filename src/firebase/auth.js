import { auth } from "../firebase/firebase";
import { createUserDocument } from "./user";

export const signUp = async ({ fname, lname, email, password, cpassword }) => {
  const res = await auth.createUserWithEmailAndPassword(email, password);
  const user = res.user;
  await user.updateProfile({ displayName: `${fname} ${lname}` });
  await createUserDocument(user);
};

export const signIn = async ({ email, password }) => {
  await auth.signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  return await auth.signOut();
};

export const passwordReset = async (email) => {
  return await auth.sendPasswordResetEmail(email);
};
