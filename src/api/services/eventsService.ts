/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "../../store/useStore";
import { Alert } from "../../utils/swal";
import { axiosBusiness } from "../axiosClient";
import { EVENT_ENDPOINTS } from "../endpoints";
import { ResponseData } from "../interfaces/common";
import { Event, EventData } from "../interfaces/event";
import { UserEvent } from "../interfaces/user";

export const list_events = async ({
  params,
  setState,
}: {
  params?: { name?: string; categories?: string; site?: string; date?: string };
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Event[] | []> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.post<ResponseData<Event[]>>(
      EVENT_ENDPOINTS.LIST_EVENTS,
      params
        ? {
            filters: params,
          }
        : {},
    );

    return data?.data || [];
  } catch (e: any) {
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
      `${EVENT_ENDPOINTS.EVENT}${id}`,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar un evento:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const list_my_events = async ({
  params,
  setState,
}: {
  params?: { date?: string };
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Event[] | null> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.post<ResponseData<Event[]>>(
      `${EVENT_ENDPOINTS.LIST_MY_EVENTS}${useStore.getState().user.id}`,
      params
        ? {
            filters: params,
          }
        : {},
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar mis eventos:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const list_events_users = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<UserEvent[] | []> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.get<ResponseData<UserEvent[]>>(
      `/events/${id}/users`,
    );

    return data?.data || [];
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al listar usuarios de un evento:", e);
    return [];
  } finally {
    setState(false);
  }
};

export const delete_event = async ({
  id,
  setState,
}: {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.delete<ResponseData<Event>>(
      `${EVENT_ENDPOINTS.EVENT}${id}`,
    );

    return data?.message || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al eliminar un evento:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const create_event = async ({
  newData,
  setState,
}: {
  newData: EventData;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Event | null> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.post<ResponseData<Event>>(
      `${EVENT_ENDPOINTS.CREATE_EVENT}`,
      newData,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al crear un evento:", e);
    return null;
  } finally {
    setState(false);
  }
};

export const update_event = async ({
  id,
  newData,
  setState,
}: {
  id: string;
  newData: EventData;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Event | null> => {
  try {
    setState(true);
    const { data } = await axiosBusiness.put<ResponseData<Event>>(
      `${EVENT_ENDPOINTS.EVENT}${id}`,
      newData,
    );

    return data?.data || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al actualizar un evento:", e);
    return null;
  } finally {
    setState(false);
  }
};
