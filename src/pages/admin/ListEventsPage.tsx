import { useEffect, useState } from "react";
import { MdCreate, MdDelete, MdNotifications, MdPeople } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Event } from "../../api/interfaces/event";
import { delete_event, list_events } from "../../api/services/eventsService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { GoBack } from "../../components/atoms/common/GoBack";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { TableButton } from "../../components/atoms/common/TableButton";
import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";
import { Alert } from "../../utils/swal";

interface RouteParams extends Record<string, string | undefined> {
  date: string;
}

export default function ListEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const singular = "evento";
  const plural = "eventos";
  const route = "event";

  const { date } = useParams<RouteParams>();

  const parseDate = (dateString: string): string => {
    const [day, month, year] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const fetchEvents = async () => {
    if (date) {
      const events = await list_events({
        params: { date: parseDate(date) },
        setState: setIsLoading,
      });
      setEvents(events);
    } else {
      setEvents(await list_events({ setState: setIsLoading }));
    }
  };

  useEffect(() => {
    fetchEvents();
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
          const res = await delete_event({ id, setState: setIsLoading });
          if (res) {
            await fetchEvents();
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

      <div
        className={`flex w-full items-center ${date ? "justify-between" : "justify-end"}`}
      >
        {date && <GoBack noMargin />}
        <PrimaryButton onClick={() => navigate(`/${route}/`)}>
          Añadir {singular}
        </PrimaryButton>
      </div>

      <LoaderComponent isLoading={isLoading}>
        <Table<Event> data={events} ignoreElements={["_id"]}>
          <TableColumn<Event>
            key="_id"
            dataIndex="image"
            title="Imagen"
            textCenter
            className="p-0"
            render={({ image, name }) => (
              <img className="w-h-20 h-20" src={image} alt={name} />
            )}
          />
          <TableColumn<Event> key="_id" dataIndex="name" title="Nombre" />
          <TableColumn<Event> key="_id" dataIndex="date" title="Fecha" />
          <TableColumn<Event> key="_id" dataIndex="site" title="Lugar" />
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
                    className="whitespace-nowrap rounded-lg border border-[#00ff66] px-2 py-1 text-center text-white"
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
                  color="yellow"
                  onClick={() => navigate(`/send-notifications/${_id}`)}
                  rounded
                  data-tooltip-id={`notification-${_id}`}
                >
                  <MdNotifications />
                  <Tooltip id={`notification-${_id}`} place="top">
                    Notificaciones para el {singular}
                  </Tooltip>
                </TableButton>
                <TableButton
                  color="green"
                  onClick={() => navigate(`/list-inscriptions/${_id}`)}
                  rounded
                  data-tooltip-id={`view-${_id}`}
                >
                  <MdPeople />
                  <Tooltip id={`view-${_id}`} place="top">
                    Visualizar inscripciones del {singular}
                  </Tooltip>
                </TableButton>
                <TableButton
                  color="blue"
                  onClick={() => navigate(`/${route}/${_id}`)}
                  rounded
                  data-tooltip-id={`edit-${_id}`}
                >
                  <MdCreate />
                  <Tooltip id={`edit-${_id}`} place="top">
                    Editar {singular}
                  </Tooltip>
                </TableButton>
                <TableButton
                  color="red"
                  rounded
                  data-tooltip-id={`delete-${_id}`}
                  onClick={() => handleDelete(_id)}
                >
                  <MdDelete />
                  <Tooltip id={`delete-${_id}`} place="top">
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
