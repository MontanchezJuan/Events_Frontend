import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../../api/interfaces/event";
import { event_by_id } from "../../api/services/eventsService";
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

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        setEvent(await event_by_id({ id, setState: setIsLoading }));
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <AdminLayout>
      <h1 className="text-2xl">
        {id ? `Evento: ${event?.name}` : "Nuevo evento"}
      </h1>

      <LoaderComponent isLoading={isLoading}>
        <EventForm initialValues={event} />
      </LoaderComponent>
    </AdminLayout>
  );
}
