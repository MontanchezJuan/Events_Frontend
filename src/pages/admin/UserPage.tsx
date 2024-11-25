import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../api/interfaces/user";
import { user_by_id } from "../../api/services/usersService";
import AdminLayout from "../../components/templates/AdminLayout";

// Importar el archivo CSS personalizado
import './custom-styles.css';

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setIsLoading(true);
        const fetchedUser = await user_by_id({ id, setState: setIsLoading });
        setUser(fetchedUser);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return (
    <div className="error-container">
      <h1 className="error-message">Usuario no encontrado</h1>
      <p className="text-center text-red-500">Usuario no encontrado.</p>;
    </div>
  );

  // Handler para la edición del usuario
  const handleEdit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert('Función de edición no implementada aún');
  };

  // Ejemplo de handler para modificar permisos
  const handlePermissionToggle = (permissionId: string) => {
    // Aquí iría la lógica para actualizar permisos del usuario
    alert(`Toggled permiso con ID: ${permissionId}`);
  };

  return (
    <AdminLayout>
      <div className="user-page-container">
        <h1 className="user-title">Usuario: {user.email}</h1>
        {/* Formulario de edición */}
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
          <button
            type="submit"
            className="save-button"
          >
            Guardar Cambios
          </button>
        </form>

        {/* Lista de permisos */}
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

