/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert } from "../../utils/swal";
import { axiosSecurity } from "../axiosClient";
import { USER_ENDPOINTS } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { User } from "../interfaces/user";

export const list_users = async ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<User[] | []> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.get<ResponseData<User[]>>(
      USER_ENDPOINTS.LIST_USERS,
    );

    return data?.data || [];
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar usuarios:", e);
    return [];
  } finally {
    setState(false);
  }
};

export const user_by_id = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<User | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.get<ResponseData<User>>(
      `${USER_ENDPOINTS.USER}${id}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar un usuario:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const delete_user = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.delete<ResponseData<string>>(
      `${USER_ENDPOINTS.USER}${id}`,
    );

    return data?.message || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al eliminar un usuario:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const update_user = async ({
  id,
  newData,
  setState,
}: {
  id: string;
  newData: { email: string; password: string };
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<User | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.put<ResponseData<User>>(
      `${USER_ENDPOINTS.USER}${id}`,
      newData,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al actualizar un usuario:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const match_userProfile = async ({
  id_user,
  id_userProfile,
  setState,
}: {
  id_user: string;
  id_userProfile: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<User | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.put<ResponseData<User>>(
      `/users/user/${id_user}/user_profile/${id_userProfile}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al hacer match un user y un userProfile:", e);
    return null;
  } finally {
    setState(false);
  }
};
