/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LoginFormData } from "../../components/molecules/forms/LoginForm";
import useStore from "../../store/useStore";
import { Alert } from "../../utils/swal";
import { axiosSecurity } from "../axiosClient";
import { SECURITY_ENDPOINTS } from "../endpoints";
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
      SECURITY_ENDPOINTS.LOGIN,
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
    Alert({ text: errorMessage });
    console.error("Error al hacer login:", e);
  } finally {
    setState(false);
  }
};

export const sign_up = async ({
  newData,
  setState,
}: {
  newData: { email: string; password: string };
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.post<ResponseData<User>>(
      SECURITY_ENDPOINTS.SIGN_UP,
      newData,
    );

    return data?.message || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al crear un usuario:", e);
    return null;
  } finally {
    setState(false);
  }
};
