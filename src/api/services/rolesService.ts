import { RoleData } from "../../components/molecules/forms/RoleForm";
import { Alert } from "../../utils/swal";
import { axiosSecurity } from "../axiosClient";
import { ROLE_ENDPOINTS } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { Role } from "../interfaces/user";

export const list_roles = async ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Role[] | []> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.get<ResponseData<Role[]>>(
      ROLE_ENDPOINTS.LIST_ROLES,
    );

    return data?.data || [];
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar roles:", e);
    return [];
  } finally {
    setState(false);
  }
};

export const create_role = async ({
  newData,
  setState,
}: {
  newData: RoleData;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Role | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.post<ResponseData<Role>>(
      `${ROLE_ENDPOINTS.LIST_ROLES}`,
      newData,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al crear un rol:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const role_by_id = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Role | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.get<ResponseData<Role>>(
      `${ROLE_ENDPOINTS.ROLE}${id}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar un rol:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const update_role = async ({
  id,
  newData,
  setState,
}: {
  id: string;
  newData: RoleData;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Role | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.put<ResponseData<Role>>(
      `${ROLE_ENDPOINTS.ROLE}${id}`,
      newData,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al actualizar un rol:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const match_role = async ({
  idRole,
  idPerm,
  setState,
}: {
  idRole: string;
  idPerm: string;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
}): Promise<Role | null> => {
  try {
    setState(idPerm);
    const { data } = await axiosSecurity.put<ResponseData<Role>>(
      `${ROLE_ENDPOINTS.ROLE}role/${idRole}/permission/${idPerm}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al asignar un permiso a un rol:", e);
    return null;
  } finally {
    setState(null);
  }
};

export const unmatch_role = async ({
  idRole,
  idPerm,
  setState,
}: {
  idRole: string;
  idPerm: string;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
}): Promise<Role | null> => {
  try {
    setState(idPerm);
    const { data } = await axiosSecurity.delete<ResponseData<Role>>(
      `${ROLE_ENDPOINTS.ROLE}role/${idRole}/permission/${idPerm}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al eliminar un permiso a un rol:", e);
    return null;
  } finally {
    setState(null);
  }
};

export const delete_role = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.delete<ResponseData<Role>>(
      `${ROLE_ENDPOINTS.ROLE}${id}`,
    );

    return data?.message || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al eliminar un rol:", e);
    return null;
  } finally {
    setState(false);
  }
};
