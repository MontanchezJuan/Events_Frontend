import { StateCreator } from "zustand";

interface Profile {
  role: string;
}

export interface UserSlice {
  profile: Profile;
  setRole: (newRole: string) => void;
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  profile: { role: "admin" },

  setRole: (newRole: string) =>
    set((state) => {
      if (newRole) {
        return { ...state.profile, profile: { role: newRole } };
      }
      return state;
    }),
});

export default createUserSlice;
