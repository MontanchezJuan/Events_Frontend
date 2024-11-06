import { useEffect, useState } from "react";
import { MdCreate, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Event } from "../../api/interfaces/event";
import { list_events } from "../../api/services/eventsService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { TableButton } from "../../components/atoms/common/TableButton";
import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";

export default function ListEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const get_events = async () => {
      const userList = await list_events({ setState: setIsLoading });

      setEvents(userList);
    };

    get_events();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl">Eventos</h1>

      <div className="flex w-full justify-end">
        <PrimaryButton onClick={() => navigate("/event/")}>
          Añadir evento
        </PrimaryButton>
      </div>

      <LoaderComponent isLoading={isLoading}>
        <Table<Event> data={events} ignoreElements={["_id"]} itemsPerPage={4}>
          <TableColumn<Event>
            key="_id"
            dataIndex="image"
            title="Fondo"
            textCenter
            render={({ image, name }) => (
              <img className="h-16 w-16" src={image} alt={name} />
            )}
          />
          <TableColumn<Event> key="_id" dataIndex="name" title="Nombre" />
          <TableColumn<Event> key="_id" dataIndex="date" title="Fecha" />
          <TableColumn<Event> key="_id" dataIndex="site" title="Lugar" />
          {/* <TableColumn<Event>
          className="flex"
          key="_id"
          dataIndex="description"
          title="Descripción"
        /> */}
          <TableColumn<Event> key="_id" dataIndex="entity" title="Entidad" />
          <TableColumn<Event>
            key="_id"
            dataIndex="categories"
            title="Categorias"
            render={({ categories }) => (
              <div className="flex min-h-full items-center justify-center gap-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`${index % 2 === 1 ? "bg-red-700" : "bg-gray-600"} rounded-lg px-2 py-1 text-center text-white`}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          />
          <TableColumn
            key="_id"
            dataIndex="actions"
            title="Acciones"
            textCenter
            render={({ _id }) => (
              <div className="flex min-h-full items-center justify-center gap-2">
                <TableButton
                  color="blue"
                  onClick={() => navigate(`/event/${_id}`)}
                  rounded
                  data-tooltip-id="edit"
                >
                  <MdCreate />
                  <Tooltip id="edit" place="top">
                    Editar evento
                  </Tooltip>
                </TableButton>
                <TableButton color="red" rounded data-tooltip-id="delete">
                  <MdDelete />
                  <Tooltip id="delete" place="top">
                    Eliminar evento
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
