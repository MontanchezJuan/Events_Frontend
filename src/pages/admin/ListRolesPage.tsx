import { useEffect, useState } from "react";
import { MdCreate, MdDelete, MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Role } from "../../api/interfaces/user";
import { delete_role, list_roles } from "../../api/services/rolesService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { TableButton } from "../../components/atoms/common/TableButton";
import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";
import { Alert } from "../../utils/swal";

export default function ListRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const singular = "rol";
  const plural = "roles";
  const route = "role";

  const get_roles = async () =>
    setRoles(await list_roles({ setState: setIsLoading }));

  useEffect(() => {
    get_roles();
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
          const res = await delete_role({ id, setState: setIsLoading });
          if (res) {
            await get_roles();
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

      <div className="flex w-full justify-end">
        <PrimaryButton onClick={() => navigate(`/${route}/`)}>
          Añadir {singular}
        </PrimaryButton>
      </div>

      <LoaderComponent isLoading={isLoading}>
        <Table<Role> data={roles} ignoreElements={["id", "status"]}>
          <TableColumn<Role> key="id" dataIndex="name" title="Nombre" />
          <TableColumn<Role>
            key="id"
            dataIndex="description"
            title="Descripción"
          />
          <TableColumn
            key="id"
            dataIndex="actions"
            title="Acciones"
            textCenter
            render={({ id }) => (
              <div className="flex min-h-full items-center justify-center gap-2">
                {id !== "656021611ae5d15c7d6d2517" ? (
                  <TableButton
                    color="blue"
                    onClick={() => navigate(`/${route}/${id}`)}
                    rounded
                    data-tooltip-id="edit"
                  >
                    <MdCreate />
                    <Tooltip id="edit" place="top">
                      Editar {singular}
                    </Tooltip>
                  </TableButton>
                ) : (
                  <TableButton
                    color="green"
                    onClick={() => navigate(`/${route}/${id}`)}
                    rounded
                    data-tooltip-id="editA"
                  >
                    <MdVisibility />
                    <Tooltip id="editA" place="top">
                      Vizualizar {singular}
                    </Tooltip>
                  </TableButton>
                )}
                {id !== "656021611ae5d15c7d6d2517" && (
                  <TableButton
                    color="red"
                    rounded
                    data-tooltip-id="delete"
                    onClick={() => handleDelete(id)}
                  >
                    <MdDelete />
                    <Tooltip id="delete" place="top">
                      Eliminar {singular}
                    </Tooltip>
                  </TableButton>
                )}
              </div>
            )}
          />
        </Table>
      </LoaderComponent>
    </AdminLayout>
  );
}
