import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Inscription } from "../../api/interfaces/inscription";
import { inscription_by_id } from "../../api/services/inscriptionsService";
import { GoBack } from "../../components/atoms/common/GoBack";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { InscriptionForm } from "../../components/molecules/forms/InscriptionForm";
import AdminLayout from "../../components/templates/AdminLayout";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function InscriptionPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inscription, setInscription] = useState<Inscription | null>();

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        setInscription(await inscription_by_id({ id, setState: setIsLoading }));
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <AdminLayout>
      <GoBack />

      <h1 className="mb-4 text-2xl">
        {id ? "Editar inscripción" : "Nuevo inscripción"}
      </h1>

      <LoaderComponent isLoading={isLoading}>
        <InscriptionForm initialValues={inscription} />
      </LoaderComponent>
    </AdminLayout>
  );
}
