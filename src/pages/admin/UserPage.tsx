import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../api/interfaces/user";
import { user_by_id } from "../../api/services/usersService";
import { GoBack } from "../../components/atoms/common/GoBack";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { UserForm } from "../../components/molecules/forms/UserForm";
import AdminLayout from "../../components/templates/AdminLayout";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const { id } = useParams<RouteParams>();

  const fetchId = async () => {
    if (id) {
      setUser(await user_by_id({ id, setState: setIsLoading }));
    }
  };

  useEffect(() => {
    fetchId();
  }, [id]);

  return (
    <AdminLayout>
      <GoBack />

      <h1 className="mb-4 text-2xl">
        {id ? "Editar usuario" : "Nuevo usuario"}
      </h1>

      <LoaderComponent isLoading={isLoading}>
        <UserForm initialValues={user} />
      </LoaderComponent>
    </AdminLayout>
  );
}
