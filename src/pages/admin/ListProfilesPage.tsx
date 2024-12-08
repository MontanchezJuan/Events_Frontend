import { useEffect, useState } from "react";
import { MdCreate, MdDelete, MdOutlinePeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { UserProfile } from "../../api/interfaces/user";
import {
  delete_profile,
  list_profiles,
} from "../../api/services/profilesService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { TableButton } from "../../components/atoms/common/TableButton";
import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";
import { Alert } from "../../utils/swal";

export default function ListProfilesPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const singular = "perfil";
  const plural = "perfiles";
  const route = "profile";

  const getPermissions = async () =>
    setProfiles(
      await list_profiles({
        setState: setIsLoading,
      }),
    );

  useEffect(() => {
    getPermissions();
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
          const res = await delete_profile({ id, setState: setIsLoading });
          if (res) {
            await getPermissions();
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
        <Table<UserProfile> data={profiles} ignoreElements={["id"]}>
          <TableColumn<UserProfile>
            key="id"
            dataIndex="profilePhoto"
            title="Foto"
            className="p-0"
            textCenter
            render={({ profilePhoto, name }) => {
              if (profilePhoto) {
                return (
                  <img
                    className="rounded-full"
                    style={{
                      width: "64px",
                      height: "64px",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto",
                    }}
                    src={profilePhoto}
                    alt={name || "profile picture"}
                  />
                );
              }

              return <MdOutlinePeople />;
            }}
          />
          <TableColumn<UserProfile>
            key="id"
            dataIndex="name"
            title="Nombre de usuario"
          />
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
