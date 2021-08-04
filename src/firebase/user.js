import { db } from "./firebase";

export const createUserDocument = async (user) => {
  const docRef = db.doc(`/users/${user.uid}`);
  const userProfile = {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    bio: "",
    location: "",
    work: "",
    education: "",
    website: "",
    instagram: "",
    facebook: "",
    twitter: "",
    github: "",
  };
  return await docRef.set(userProfile);
};
