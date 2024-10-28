import { StateCreator } from "zustand";

export type Role = "admin" | "organizer" | "user" | "unauthenticated";

interface User {
  role: Role;
}

export interface UserSlice {
  user: User;
  setRole: (newRole: Role) => void;
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: { role: "unauthenticated" },

  setRole: (newRole: Role) =>
    set((state) => {
      if (newRole) {
        return { ...state.user, user: { role: newRole } };
      }
      return state;
    }),
});

export default createUserSlice;
