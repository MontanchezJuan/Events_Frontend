import { Alert } from "../../utils/swal";
import { axiosBusiness } from "../axiosClient";
import { FEEDBACKS_ENDPOINTS } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { FeedBack } from "../interfaces/feedback";

export const list_feedbacks = async ({
  params,
  setState,
}: {
  params?: { user_id?: string; event_id: string };
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<FeedBack[] | []> => {
  try {
    setState(true);

    const { data } = await axiosBusiness.post<ResponseData<FeedBack[]>>(
      `${FEEDBACKS_ENDPOINTS.LIST_FEEDBACKS}`,
      params
        ? {
            filters: params,
          }
        : {},
    );

    return data.data || [];
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar comentarios:", e);
    return [];
  } finally {
    setState(false);
  }
};

export const create_feedback = async ({
  newData,
  setState,
}: {
  newData: FeedBack;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  try {
    setState(true);

    const { data } = await axiosBusiness.post<ResponseData<null>>(
      `${FEEDBACKS_ENDPOINTS.CREATE_FEEDBACK}`,
      newData,
    );

    return data.message || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al crear un comentario:", e);
    return null;
  } finally {
    setState(false);
  }
};
