import { useEffect, useState } from "react";
import { MdCreate, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { User } from "../../api/interfaces/user";
import { delete_user, list_users } from "../../api/services/usersService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { TableButton } from "../../components/atoms/common/TableButton";
import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";
import { Alert } from "../../utils/swal";

export default function ListUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const singular = "usuario";
  const plural = "usuarios";
  const route = "user";

  const get_users = async () =>
    setUsers(await list_users({ setState: setIsLoading }));

  useEffect(() => {
    get_users();
  }, []);

  const handleDelete = (id: string) => {
    Alert({
      cancelButtonText: "Cancelar",
      confirmButtonText: `Sí, eliminar ${singular}`,
      icon: "question",
      showCancelButton: true,
      text: `Deseas eliminar este ${singular}?`,
      title: "Alerta",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        const resquest = async () => {
          const res = await delete_user({ id, setState: setIsLoading });
          if (res) {
            await get_users();
            Alert({ text: res, icon: "success", title: "Ok" });
          }
        };

        resquest();
      }
    });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl capitalize">{plural}</h1>

      <div className="flex justify-end w-full">
        <PrimaryButton onClick={() => navigate(`/${route}/`)}>
          Añadir {singular}
        </PrimaryButton>
      </div>

      <LoaderComponent isLoading={isLoading}>
        <Table<User> data={users} ignoreElements={["id", "userProfile"]}>
          <TableColumn<User> key="id" dataIndex="email" title="Correo" />
          <TableColumn<User> key="id" dataIndex="role.name" title="Rol" />
          <TableColumn
            key="id"
            dataIndex="actions"
            title="Acciones"
            textCenter
            render={({ id }) => (
              <div className="flex items-center justify-center min-h-full gap-2">
                <TableButton
                  color="blue"
                  onClick={() => navigate(`/${route}/${id}`)}
                  rounded
                  data-tooltip-id={`edit-${id}`}
                >
                  <MdCreate />
                  <Tooltip id={`edit-${id}`} place="top">
                    Editar {singular}
                  </Tooltip>
                </TableButton>
                <TableButton
                  color="red"
                  rounded
                  data-tooltip-id={`delete-${id}`}
                  onClick={() => handleDelete(id)}
                >
                  <MdDelete />
                  <Tooltip id={`delete-${id}`} place="top">
                    Eliminar {singular}
                  </Tooltip>
                </TableButton>
              </div>
            )}
          />
        </Table>
      </LoaderComponent>
    </AdminLayout>
  );
}
