import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventForm } from "../../components/molecules/forms/EventForm";
import AdminLayout from "../../components/templates/AdminLayout";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

interface FormData {
  email: string;
  password: string;
}

export default function EventPage() {
  const [uwu, setUwu] = useState<FormData | undefined>(undefined);

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    if (id) {
      setUwu({ email: "string", password: "string" });
    }
  }, [id]);

  return (
    <AdminLayout>
      <h1 className="text-2xl">{id ? `Evento: ${id}` : "Nuevo evento"}</h1>

      <EventForm initialValues={uwu} />
    </AdminLayout>
  );
}
