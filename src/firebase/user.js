import { db } from "./firebase";

export const createUserDocument = async (user) => {
  if (!user) return;

  const docRef = db.doc(`/users/${user.uid}`);
  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    const { uid, displayName, email, photoURL } = user;
    const createdAt = new Date();
    const userProfile = {
      uid,
      displayName,
      email,
      photoURL,
      createdAt,
      bio: "",
      location: "",
      instagram: "",
      facebook: "",
      twitter: "",
    };

    await docRef.set(userProfile);
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  const docRef = db.doc(`/users/${uid}`).get();
  return { uid, ...(await docRef).data() };
};
