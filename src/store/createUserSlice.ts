import { StateCreator } from "zustand";
import { axiosSecurity } from "../api/axiosClient";
import { ENDPOINTS_SECURITY } from "../api/endpoints";
import { ResponseData } from "../api/interfaces/common";
import { User } from "../api/interfaces/user";
import { isTokenExpired } from "../utils/jwt";
import { Alert } from "../utils/swal";

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
        const res = await axiosSecurity.get<ResponseData<User>>(
          ENDPOINTS_SECURITY.GET_USER,
        );

        if (res.data && res.data.data) {
          const user = res.data.data;
          set((state) => ({
            user: { ...state.user, ...user, token },
          }));
        }
      } catch (e) {
        localStorage.removeItem("token");
        set(() => ({
          user: initialUser,
        }));
        Alert({
          title: "Ups!",
          text: "Tu sesión ha expirado",
          icon: "info",
        });
        console.error("Error al verificar al usuario:", e);
      }
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
