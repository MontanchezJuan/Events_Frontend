import useStore from "../../store/useStore";
import { Alert } from "../../utils/swal";
import { axiosBusiness } from "../axiosClient";
import { NOTIFICATIONS_ENDPOINTS } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { Notification } from "../interfaces/notification";

export const get_notifications = async (): Promise<Notification[] | []> => {
  try {
    const { data } = await axiosBusiness.get<ResponseData<Notification[]>>(
      `${NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS}${useStore.getState().user.id}`,
    );

    return data?.data || [];
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al enviar notificación:", e);
    return [];
  }
};

export const send_notification = async ({
  event_id,
  data,
  setState,
}: {
  event_id: string;
  data: any;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<any | null> => {
  try {
    setState(true);

    const res = await axiosBusiness.post<any>(
      `${NOTIFICATIONS_ENDPOINTS.CREATE}${event_id}`,
      data,
    );

    return res || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al enviar notificación:", e);
    return null;
  } finally {
    setState(false);
  }
};
