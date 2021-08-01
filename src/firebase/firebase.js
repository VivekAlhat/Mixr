import firebase from "firebase";
import { firebaseConfig } from "../config/config";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
