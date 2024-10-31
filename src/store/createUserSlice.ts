import { StateCreator } from "zustand";
import axiosClient from "../api/axiosClient";
import { ENDPOINTS } from "../api/endpoints";
import { ResponseData } from "../api/interfaces/common";
import { User } from "../api/interfaces/user";
import { isTokenExpired } from "../utils/jwt";

export interface UserSlice {
  user: User & { token: string | null };
  checkAndLoadUser: () => Promise<void>;
  resetUser: () => void;
  setToken: (token: string | null) => void;
  setUser: (newUser: User) => void;
}

const initialUser: User & { token: string | null } = {
  email: "",
  id: "",
  role: {
    id: "",
    description: "",
    name: "unauthenticated",
    status: 0,
    totalPermissions: [],
  },
  password: "",
  userProfile: null,
  token: localStorage.getItem("token"),
};

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: initialUser,

  checkAndLoadUser: async () => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      try {
        const res = await axiosClient.get<ResponseData<User>>(
          ENDPOINTS.GET_USER,
        );

        if (res.data && res.data.data) {
          const user = res.data.data;
          set((state) => ({
            user: { ...state.user, ...user },
          }));
        } else {
          console.error("La respuesta no contiene un usuario válido");
        }
      } catch (error) {
        console.error("Error en get_user:", error);
      }
    } else {
      console.log("Token expirado o no válido");
      set(() => ({
        user: { ...initialUser },
      }));
      localStorage.removeItem("token");
    }
  },

  resetUser: () =>
    set(() => ({
      user: { ...initialUser },
    })),

  setToken: (token: string | null) =>
    set((state) => ({
      user: { ...state.user, token },
    })),

  setUser: (newUser: User) =>
    set((state) => ({
      user: { ...state.user, ...newUser },
    })),
});

export default createUserSlice;
