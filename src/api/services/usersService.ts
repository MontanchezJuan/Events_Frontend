/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert } from "../../utils/swal";
import { axiosSecurity } from "../axiosClient";
import { ENDPOINTS_SECURITY } from "../endpoints";
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
      ENDPOINTS_SECURITY.LIST_USERS,
    );

    return data?.data || [];
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ message: errorMessage });
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
      `${ENDPOINTS_SECURITY.USER_BY_ID}${id}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ message: errorMessage });
    console.error("Error al listar un usuario:", e);
    return null;
  } finally {
    setState(false);
  }
};

// TODO: THIS SHIT

// export const create_user = async ({
//   id,
//   setState,
// }: {
//   id: string;
//   setState: React.Dispatch<React.SetStateAction<boolean>>;
// }): Promise<User | null> => {
//   try {
//     setState(true);
//     const { data } = await axiosSecurity.post<ResponseData<User>>(
//       `${ENDPOINTS_SECURITY.USER_BY_ID}${id}`,
//     );

//     return data?.data || null;
//   } catch (e: any) {
//     const errorMessage = e.response?.data?.message || "Algo salió mal";
//     Alert({ message: errorMessage });
//     console.error("Error al listar un usuario:", e);
//     return null;
//   } finally {
//     setState(false);
//   }
// };
export const getAuthenticatedUserProfile = async ({
  id,
  setState, 

}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<User | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.get<ResponseData<User>>(
      `${ENDPOINTS_SECURITY.AUTHENTICATED_USER_PROFILE}${id}`
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ message: errorMessage });
    console.error("Error al obtener el perfil del usuario autenticado:", e);
    return null;
  } finally {
    setState(false);
  }
};