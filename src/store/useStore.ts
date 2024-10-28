import { create } from "zustand";
import createScreenSlice, { ScreenSlice } from "./createScreenSlice";
import createUserSlice, { UserSlice } from "./createUserSlice";

const useStore = create<UserSlice & ScreenSlice>()((...a) => ({
  ...createScreenSlice(...a),
  ...createUserSlice(...a),
}));

export default useStore;
