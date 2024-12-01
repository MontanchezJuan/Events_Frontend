/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert } from "../../utils/swal";
import { axiosBusiness } from "../axiosClient";
import { INSCRIPTIONS_ENDPOINTS } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { Inscription, InscriptionData } from "../interfaces/inscription";

export const list_inscriptions = async ({
  params,
  setState,
}: {
  params?: InscriptionData;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Inscription[] | []> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.post<ResponseData<Inscription[]>>(
      INSCRIPTIONS_ENDPOINTS.LIST_INSCRIPTIONS,
      params
        ? {
            filters: params,
          }
        : {},
    );

    return data?.data || [];
  } catch (e: any) {
    console.error("Error al listar inscripciones:", e);
    return [];
  } finally {
    setState(false);
  }
};

export const inscription_by_id = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Inscription | null> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.get<ResponseData<Inscription>>(
      `${INSCRIPTIONS_ENDPOINTS.INSCRIPTION}${id}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar una inscripción:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const delete_inscription = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.delete<ResponseData<Inscription>>(
      `${INSCRIPTIONS_ENDPOINTS.INSCRIPTION}${id}`,
    );

    return data?.message || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al eliminar una inscripción:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const create_inscription = async ({
  newData,
  setState,
}: {
  newData: InscriptionData;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<ResponseData<Inscription> | null> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.post<ResponseData<Inscription>>(
      `${INSCRIPTIONS_ENDPOINTS.CREATE_INSCRIPTION}`,
      newData,
    );

    return data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al crear una inscripción:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const update_inscription = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.put<ResponseData<null>>(
      `${INSCRIPTIONS_ENDPOINTS.INSCRIPTION}${id}`,
    );

    return data?.message || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al actualizar una inscripción:", e);
    return null;
  } finally {
    setState(false);
  }
};
