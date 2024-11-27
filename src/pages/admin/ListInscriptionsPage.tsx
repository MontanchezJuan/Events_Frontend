import { useEffect, useState } from "react";
import { MdCreate, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Inscription } from "../../api/interfaces/inscription";
import { list_inscriptions } from "../../api/services/inscriptionsService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { TableButton } from "../../components/atoms/common/TableButton";
import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";

export default function ListInscriptionsPage() {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const get_users = async () => {
      const userList = await list_inscriptions({ setState: setIsLoading });

      setInscriptions(userList);
    };

    get_users();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl">Inscripciones</h1>

      <div className="flex w-full justify-end">
        <PrimaryButton onClick={() => navigate("/inscription/")}>
          Añadir inscripción
        </PrimaryButton>
      </div>

      <LoaderComponent isLoading={isLoading}>
        <Table<Inscription>
          data={inscriptions}
          ignoreElements={["_id"]}
          itemsPerPage={3}
        >
          <TableColumn<Inscription> key="_id" dataIndex="" title="Correo" />
          <TableColumn<Inscription> key="_id" dataIndex="" title="Rol" />
          <TableColumn
            key="_id"
            dataIndex="actions"
            title="Acciones"
            textCenter
            render={({ _id }) => (
              <div className="flex min-h-full items-center justify-center gap-2">
                <TableButton
                  color="blue"
                  onClick={() => navigate(`/inscription/${_id}`)}
                  rounded
                  data-tooltip-id="edit"
                >
                  <MdCreate />
                  <Tooltip id="edit" place="top">
                    Editar inscripción
                  </Tooltip>
                </TableButton>
                <TableButton color="red" rounded data-tooltip-id="delete">
                  <MdDelete />
                  <Tooltip id="delete" place="top">
                    Eliminar inscripción
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
