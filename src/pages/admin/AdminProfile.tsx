import { useEffect, useState } from "react";
import { User } from "../../api/interfaces/user";
import AdminLayout from "../../components/templates/AdminLayout";
import { user_by_id } from "../../api/services/usersService";
import { useParams } from "react-router-dom";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";

interface RouteParams extends Record<string, string | undefined> {
    id: string;
}

export default function adminProfile() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const { id } = useParams<RouteParams>();

    useEffect(() => {
        const getAdminProfile = async () => {
            if (id) {
              setUser(await user_by_id({ id, setState: setIsLoading }));
            }
        }
        getAdminProfile();
    }, [id]);

    return (
        <AdminLayout>
            <div>
                <div className="text-center">
                    <h1 className="text-4xl" style={{ color: '#00FF66' }}>Datos personales</h1>
                    <p>Aqui se mostrara la informacion del administrador.</p>
                    <LoaderComponent isLoading={isLoading}>
                    {/* <UserForm initialValues={event} /> */}
                    <>{JSON.stringify(user)}</>
                    </LoaderComponent>
                </div>
            </div>
        </AdminLayout>
    )
}