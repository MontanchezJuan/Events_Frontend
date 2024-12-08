import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Role } from "../../api/interfaces/user";
import { role_by_id } from "../../api/services/rolesService";
import { GoBack } from "../../components/atoms/common/GoBack";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { RoleForm } from "../../components/molecules/forms/RoleForm";
import AdminLayout from "../../components/templates/AdminLayout";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function RolePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<Role | null>(null);

  const { id } = useParams<RouteParams>();

  const fetchId = async () => {
    if (id) {
      setRole(await role_by_id({ id, setState: setIsLoading }));
    }
  };

  useEffect(() => {
    fetchId();
  }, [id]);

  return (
    <AdminLayout>
      <GoBack />

      <h1 className="mb-4 text-2xl">{id ? "Editar rol" : "Nuevo rol"}</h1>

      <LoaderComponent isLoading={isLoading}>
        <RoleForm initialValues={role} />
      </LoaderComponent>
    </AdminLayout>
  );
}
