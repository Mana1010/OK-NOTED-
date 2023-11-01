import { create } from "zustand";
import { db, auth } from "../sdk/firebase";

const store = {
  user: [],
};
