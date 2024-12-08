import { PermissionFormData } from "../../components/molecules/forms/PermissionForm";
import { Alert } from "../../utils/swal";
import { axiosSecurity } from "../axiosClient";
import { PERMISSION_ENDPOINTS } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { Permission } from "../interfaces/user";

export const list_permissions = async ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Permission[] | []> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.get<ResponseData<Permission[]>>(
      PERMISSION_ENDPOINTS.LIST_PERMISSIONS,
    );

    return data?.data || [];
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar permisos:", e);
    return [];
  } finally {
    setState(false);
  }
};

export const create_permission = async ({
  newData,
  setState,
}: {
  newData: PermissionFormData;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Permission | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.post<ResponseData<Permission>>(
      `${PERMISSION_ENDPOINTS.LIST_PERMISSIONS}`,
      newData,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al crear un permiso:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const permission_by_id = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Permission | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.get<ResponseData<Permission>>(
      `${PERMISSION_ENDPOINTS.PERMISSION}${id}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar un permiso:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const update_permission = async ({
  id,
  newData,
  setState,
}: {
  id: string;
  newData: PermissionFormData;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Permission | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.put<ResponseData<Permission>>(
      `${PERMISSION_ENDPOINTS.PERMISSION}${id}`,
      newData,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al actualizar un permiso:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const delete_permission = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  try {
    setState(true);
    const { data } = await axiosSecurity.delete<ResponseData<Permission>>(
      `${PERMISSION_ENDPOINTS.PERMISSION}${id}`,
    );

    return data?.message || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al eliminar un permiso:", e);
    return null;
  } finally {
    setState(false);
  }
};
