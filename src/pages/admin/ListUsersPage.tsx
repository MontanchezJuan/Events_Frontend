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

  const get_users = async () => {
    const userList = await list_users({ setState: setIsLoading });

    setUsers(userList);
  };

  useEffect(() => {
    get_users();
  }, []);

  const deleteUser = (id: string) => {
    Alert({
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar usuario",
      icon: "question",
      showCancelButton: true,
      text: `Deseas eliminar este usuario?`,
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
      <h1 className="text-2xl">Usuarios</h1>

      <div className="flex w-full justify-end">
        <PrimaryButton onClick={() => navigate("/user/")}>
          Añadir usuario
        </PrimaryButton>
      </div>

      <LoaderComponent isLoading={isLoading}>
        <Table<User>
          data={users}
          ignoreElements={["id", "userProfile"]}
          itemsPerPage={5}
        >
          <TableColumn<User> key="id" dataIndex="email" title="Correo" />
          <TableColumn<User> key="id" dataIndex="role.name" title="Rol" />
          <TableColumn
            key="id"
            dataIndex="actions"
            title="Acciones"
            textCenter
            render={({ id }) => (
              <div className="flex min-h-full items-center justify-center gap-2">
                <TableButton
                  color="blue"
                  onClick={() => navigate(`/user/${id}`)}
                  rounded
                  data-tooltip-id="edit"
                >
                  <MdCreate />
                  <Tooltip id="edit" place="top">
                    Editar usuario
                  </Tooltip>
                </TableButton>
                <TableButton
                  color="red"
                  rounded
                  data-tooltip-id="delete"
                  onClick={() => deleteUser(id)}
                >
                  <MdDelete />
                  <Tooltip id="delete" place="top">
                    Eliminar usuario
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
