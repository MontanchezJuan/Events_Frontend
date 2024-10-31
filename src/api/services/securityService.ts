import { LoginFormData } from "../../components/molecules/forms/LoginForm";
import { SignupFormData } from "../../components/molecules/forms/SignupForm";
import useStore from "../../store/useStore";
import axiosClient from "../axiosClient";
import { ENDPOINTS } from "../endpoints";
import { ResponseData } from "../interfaces/common";

export const login = async ({ email, password }: LoginFormData) => {
  try {
    const { data } = await axiosClient.post<ResponseData<string>>(
      ENDPOINTS.LOGIN,
      {
        email,
        password,
      },
    );

    if (data && data.data) {
      const token = data.data;
      console.log(token);

      localStorage.setItem("token", token);
      useStore.getState().setToken(token);
      await useStore.getState().checkAndLoadUser();
      console.log(data.message);
    }
  } catch (error) {
    console.error("Error en login:", error);
  }
};

export const sign_up = async ({ email, password }: SignupFormData) => {
  alert({ email, password });

  // todo: to finish this

  //   try {
  //     const { data } = await axiosClient.post<ResponseData<string>>(
  //       ENDPOINTS.SIGN_UP,
  //       {
  //         email,
  //         password,
  //       },
  //     );

  //     if (data && data.data) {
  //       const token = data.data;
  //       console.log(token);

  //       localStorage.setItem("token", token);
  //       useStore.getState().setToken(token);
  //       await useStore.getState().checkAndLoadUser();
  //       console.log(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error en login:", error);
  //   }
};
