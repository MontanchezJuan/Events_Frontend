import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../api/interfaces/user";
import { user_by_id } from "../../api/services/usersService";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import AdminLayout from "../../components/templates/AdminLayout";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const fetchuser = async () => {
      if (id) {
        setUser(await user_by_id({ id, setState: setIsLoading }));
      }
    };

    fetchuser();
  }, [id]);

  return (
    <AdminLayout>
      <h1 className="text-2xl">
        {id ? `Usuario: ${user?.email}` : "Nuevo usuario"}
      </h1>

      <LoaderComponent isLoading={isLoading}>
        {/* <UserForm initialValues={event} /> */}
        <>{JSON.stringify(user)}</>
      </LoaderComponent>
    </AdminLayout>
  );
}
