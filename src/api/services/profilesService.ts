import { Alert } from "../../utils/swal";
import { axiosSecurity } from "../axiosClient";
import { PROFILE_ENDPOINTS } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { UserProfile } from "../interfaces/user";

export const list_profiles = async ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<UserProfile[] | []> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.get<ResponseData<UserProfile[]>>(
      `${PROFILE_ENDPOINTS.LIST_PROFILES}`,
    );

    return data?.data || [];
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar un perfil de usuario:", e);
    return [];
  } finally {
    setState(false);
  }
};

export const create_profile = async ({
  newData,
  setState,
}: {
  newData: Omit<UserProfile, "id">;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<UserProfile | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.post<ResponseData<UserProfile>>(
      `${PROFILE_ENDPOINTS.LIST_PROFILES}`,
      newData,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al crear un perfil de usuario:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const profile_by_id = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<UserProfile | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.get<ResponseData<UserProfile>>(
      `${PROFILE_ENDPOINTS.PROFILE}${id}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar un perfil de usuario:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const update_profile = async ({
  id,
  newData,
  setState,
}: {
  id: string;
  newData: UserProfile;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<UserProfile | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.put<ResponseData<UserProfile>>(
      `${PROFILE_ENDPOINTS.PROFILE}${id}`,
      newData,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al actualizar un perfil de usuario:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const delete_profile = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.delete<ResponseData<UserProfile>>(
      `${PROFILE_ENDPOINTS.PROFILE}${id}`,
    );

    return data?.message || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar un perfil de usuario:", e);
    return null;
  } finally {
    setState(false);
  }
};
