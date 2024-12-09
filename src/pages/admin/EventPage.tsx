import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Event } from "../../api/interfaces/event";
import { event_by_id } from "../../api/services/eventsService";
import { GoBack } from "../../components/atoms/common/GoBack";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { EventForm } from "../../components/molecules/forms/EventForm";
import AdminLayout from "../../components/templates/AdminLayout";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function EventPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<Event | null>(null);

  const { id } = useParams<RouteParams>();
  const location = useLocation();
  const state = location.state as { date?: string };

  const fetchId = async () => {
    if (id) {
      setEvent(await event_by_id({ id, setState: setIsLoading }));
    }
  };

  const parseDate = (): string => {
    if (state && state.date) {
      const [day, month, year] = state.date.split("/");

      const formattedDay = day.padStart(2, "0");
      const formattedMonth = month.padStart(2, "0");
      return `${formattedDay}/${formattedMonth}/${year}`;
    }

    return "";
  };

  useEffect(() => {
    fetchId();
  }, [id]);

  return (
    <AdminLayout>
      <GoBack />

      <h1 className="mb-4 text-2xl">{id ? "Editar evento" : "Nuevo evento"}</h1>

      <LoaderComponent isLoading={isLoading}>
        <EventForm
          initialValues={{
            ...event,
            _id: event?._id || "",
            categories: event?.categories || [],
            date: event?.date ? event?.date : parseDate(),
            description: event?.description || "",
            entity: event?.entity || "",
            image: event?.image || "",
            is_active: event?.is_active ?? true,
            name: event?.name || "",
            organizer_id: event?.organizer_id || "",
            restrictions: event?.restrictions || [],
            site: event?.site || "",
            time: event?.time || "",
          }}
        />
      </LoaderComponent>
    </AdminLayout>
  );
}
