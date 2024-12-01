import { StateCreator } from "zustand";
import { axiosSecurity } from "../api/axiosClient";
import { SECURITY_ENDPOINTS } from "../api/endpoints";
import { ResponseData } from "../api/interfaces/common";
import { User } from "../api/interfaces/user";
import { isTokenExpired } from "../utils/jwt";
import { Alert } from "../utils/swal";
import useStore from "./useStore";

export interface UserSlice {
  user: User & { token: string | null };
  checkAndLoadUser: () => Promise<void>;
  get_user: () => Promise<void>;
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
  userProfile: {
    id: "",
    name: "",
    profilePhoto: "",
  },
  token: localStorage.getItem("token"),
};

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: initialUser,

  checkAndLoadUser: async () => {
    const token = localStorage.getItem("token");
    if (!!token && !isTokenExpired(token)) {
      try {
        await useStore.getState().get_user();
        set((state) => ({
          user: { ...state.user, token },
        }));
      } catch (error) {
        localStorage.removeItem("token");
        set(() => ({
          user: initialUser,
        }));
        console.log("Error en checkAndLoadUser:", error);
      }
    }
  },

  get_user: async () => {
    try {
      const { data } = await axiosSecurity.get<ResponseData<User>>(
        SECURITY_ENDPOINTS.GET_USER,
      );

      if (data && data.data) {
        const user = data.data;
        set((state) => ({
          user: { ...state.user, ...user },
        }));
      }
    } catch (e) {
      set(() => ({
        user: initialUser,
      }));
      Alert({
        title: "Ups!",
        text: "Tu sesión ha expirado",
        icon: "info",
      });
      console.error("Error al verificar al usuario:", e);
      throw e;
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
