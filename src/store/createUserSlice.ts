import { StateCreator } from "zustand";

export type Role = "admin" | "organo" | "user" | "not-user";

interface User {
  role: Role;
}

export interface UserSlice {
  user: User;
  setRole: (newRole: Role) => void;
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: { role: "not-user" },

  setRole: (newRole: Role) =>
    set((state) => {
      if (newRole) {
        return { ...state.user, user: { role: newRole } };
      }
      return state;
    }),
});

export default createUserSlice;
