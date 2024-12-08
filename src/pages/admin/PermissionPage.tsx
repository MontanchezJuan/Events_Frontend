import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Permission } from "../../api/interfaces/user";
import { permission_by_id } from "../../api/services/permissionsService";
import { GoBack } from "../../components/atoms/common/GoBack";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { PermissionForm } from "../../components/molecules/forms/PermissionForm";
import AdminLayout from "../../components/templates/AdminLayout";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function PermissionPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [permission, setPermission] = useState<Permission | null>(null);

  const { id } = useParams<RouteParams>();

  const fetchId = async () => {
    if (id) {
      setPermission(await permission_by_id({ id, setState: setIsLoading }));
    }
  };

  useEffect(() => {
    fetchId();
  }, [id]);

  return (
    <AdminLayout>
      <GoBack />

      <h1 className="mb-4 text-2xl">
        {id ? "Editar permiso" : "Nuevo permiso"}
      </h1>

      <LoaderComponent isLoading={isLoading}>
        <PermissionForm initialValues={permission} />
      </LoaderComponent>
    </AdminLayout>
  );
}
