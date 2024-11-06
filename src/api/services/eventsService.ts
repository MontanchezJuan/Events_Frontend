/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert } from "../../utils/swal";
import { axiosBusiness } from "../axiosClient";
import { ENDPOINTS_BUSINESS } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { Event } from "../interfaces/event";

export const list_events = async ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Event[] | []> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.post<ResponseData<Event[]>>(
      ENDPOINTS_BUSINESS.LIST_EVENTS,
      {
        filters: {},
      },
    );

    return data?.data || [];
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ message: errorMessage });
    console.error("Error al listar eventos:", e);
    return [];
  } finally {
    setState(false);
  }
};

export const event_by_id = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Event | null> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.get<ResponseData<Event>>(
      `${ENDPOINTS_BUSINESS.EVENT_BY_ID}${id}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ message: errorMessage });
    console.error("Error al listar un evento:", e);
    return null;
  } finally {
    setState(false);
  }
};
