import { create } from "zustand";
import createUserSlice, { UserSlice } from "./createUserSlice";

const useStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));

export default useStore;
