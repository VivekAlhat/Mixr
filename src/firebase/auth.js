import { auth } from "../firebase/firebase";

export const signUp = async ({ fname, lname, email, password, cpassword }) => {
  const res = await auth.createUserWithEmailAndPassword(email, password);
  const user = res.user;
  await user.updateProfile({ displayName: `${fname} ${lname}` });
  return user;
};

export const signIn = async ({ email, password }) => {
  const res = await auth.signInWithEmailAndPassword(email, password);
  return res.user;
};

export const signOut = async () => {
  return await auth.signOut();
};

export const passwordReset = async (email) => {
  return await auth.sendPasswordResetEmail(email);
};
