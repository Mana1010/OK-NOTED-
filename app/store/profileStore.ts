import { create } from "zustand";
import { setDoc, query, doc } from "firebase/firestore";
import { auth, db } from "../sdk/firebase";
const store = (set: any) => ({
  userProfile: [],
  setProfile: async (profile: any) => {
    const currentPerson = auth.currentUser;
  },
});
