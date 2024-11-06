/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../../components/molecules/forms/LoginForm";
import { SignupFormData } from "../../components/molecules/forms/SignupForm";
import { PUBLICROUTES } from "../../routes/Public.routes";
import useStore from "../../store/useStore";
import { Alert } from "../../utils/swal";
import { axiosSecurity } from "../axiosClient";
import { ENDPOINTS_SECURITY } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { User } from "../interfaces/user";

export const login = async ({
  email,
  password,
  setState,
}: LoginFormData & {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setState(true);
    const { data } = await axiosSecurity.post<ResponseData<string>>(
      ENDPOINTS_SECURITY.LOGIN,
      {
        email,
        password,
      },
    );

    if (data && data.data) {
      const token = data.data;
      localStorage.setItem("token", token);
      useStore.getState().setToken(token);
      await useStore.getState().checkAndLoadUser();
    }
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ message: errorMessage });
    console.error("Error al hacer login:", e);
  } finally {
    setState(false);
  }
};

export const sign_up = async ({
  email,
  password,
  setState,
  navigate,
}: SignupFormData & {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: ReturnType<typeof useNavigate>;
}) => {
  try {
    setState(true);
    const { data } = await axiosSecurity.post<ResponseData<User>>(
      ENDPOINTS_SECURITY.SIGN_UP,
      {
        email,
        password,
      },
    );

    if (data && data.data) {
      Alert({
        message: data.message,
        icon: "success",
        title: "Todo correcto",
      }).then(() => {
        navigate(PUBLICROUTES.LOGIN);
      });
    }
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ message: errorMessage });
    console.error("Error al hacer sign-up:", e);
  } finally {
    setState(false);
  }
};
