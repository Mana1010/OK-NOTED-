import { create } from "zustand";
import { db, auth } from "../sdk/firebase";
import { onAuthStateChanged } from "firebase/auth";
const store = (set: any) => ({
  user: [],
  authenticated: true,
  stateChanged: () => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        set({ authenticated: false });
      } else {
        set({ authenticated: true });
      }
    });
  },
});
export const useAuthData = create(store);
