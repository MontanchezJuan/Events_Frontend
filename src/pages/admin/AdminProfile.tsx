import { useEffect, useState } from "react";
import { User } from "../../api/interfaces/user";
import { getAuthenticatedUserProfile } from "../../api/services/usersService";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import AdminLayout from "../../components/templates/AdminLayout";
import useStore from "../../store/useStore";

// Importar el archivo CSS personalizado
import './custom-styles.css';
import { useParams } from "react-router-dom";
interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function AdminProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useStore(state => state.user);
  const id = user.id;
  console.log("el id es", id);


  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (id) {
        setIsLoading(true);
        const fetchAdminProfile = await getAuthenticatedUserProfile({ id, setState: setIsLoading });
        setIsLoading(false);

      } else {
        console.log("no hay id");
      }
    };

    fetchAdminProfile();
  }, [id]);

  if (!user) return (
    <div className="error-container">
      <h1 className="error-message">Usuario no encontrado</h1>
      <p className="text-center text-red-500">Usuario no encontrado.</p>
    </div>
  );

  const handleEdit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert('Función de edición no implementada aún');
  };

  const handlePermissionToggle = (permissionId: string) => {
    alert(`Toggled permiso con ID: ${permissionId}`);
  };

  return (
    <AdminLayout>
      <div className="user-page-container">
        <h1 className="user-title">Administrador: {user.email}</h1>
        <form onSubmit={handleEdit} className="user-form">
          <div className="mb-4">
            <label>Correo</label>
            <input
              type="email"
              defaultValue={user.email}
            />
          </div>
          <div className="mb-4">
            <label>Nombre del Rol</label>
            <input
              type="text"
              defaultValue={user.role?.name}
            />
          </div>
          <div className="mb-4">
            <label>Nombre</label>
            <input
              type="text"
              defaultValue={user.role?.description}
            />
            </div>
          <button
            type="submit"
            className="save-button"
          >
            Guardar Cambios
          </button>
        </form>

        <div className="permissions-container">
          <h2 className="permissions-header">Permisos</h2>
          <ul className="permissions-list">
            {user.role.totalPermissions && user.role.totalPermissions.length > 0 ? (
              user.role.totalPermissions.map((permission) => (
                <li key={permission.id} className="permissions-list-item">
                  {permission.description}
                  <button
                    className="permission-toggle-button"
                    onClick={() => handlePermissionToggle(permission.id)}
                  >
                    Modificar
                  </button>
                </li>
              ))
            ) : (
              <li className="permissions-list-item">No hay permisos asignados.</li>
            )}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}