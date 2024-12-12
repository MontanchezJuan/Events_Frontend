import { useEffect, useState } from "react";
import { MdOutlinePeople } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Event } from "../../api/interfaces/event";
import { UserEvent } from "../../api/interfaces/user";
import {
  change_status_event,
  event_by_id,
  list_events_users,
} from "../../api/services/eventsService";
import { update_inscription } from "../../api/services/inscriptionsService";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../components/atoms/common/Button";
import { GoBack } from "../../components/atoms/common/GoBack";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";
import { Alert } from "../../utils/swal";

interface RouteParams extends Record<string, string | undefined> {
  idEvent: string;
}

export default function ListInscriptionsPage() {
  const [inscriptions, setInscriptions] = useState<UserEvent[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading1, setIsLoading1] = useState<boolean>(false);

  const plural = "inscripciones";

  const { idEvent } = useParams<RouteParams>();

  const get_inscriptions = async () => {
    if (idEvent) {
      setInscriptions(
        await list_events_users({ id: idEvent, setState: setIsLoading }),
      );
      setEvent(await event_by_id({ id: idEvent, setState: setIsLoading }));
    }
  };

  useEffect(() => {
    get_inscriptions();
  }, []);

  const handleInscription = async (id: string) => {
    const res = await update_inscription({
      id,
      setState: setIsLoading,
    });

    if (res) {
      get_inscriptions();
      Alert({ text: res, icon: "success", title: "Ok" });
    }
  };

  const finishEvent = async () => {
    if (idEvent) {
      const res = await change_status_event({
        id: idEvent,
        setState: setIsLoading1,
      });

      if (res) {
        Alert({
          title: "Ok",
          text: res,
          icon: "success",
        });
      }
    }
  };

  return (
    <AdminLayout>
      <GoBack />

      <h1 className="text-2xl capitalize">{plural}</h1>

      <LoaderComponent isLoading={isLoading1}>
        {event?.is_active ? (
          <SecondaryButton onClick={finishEvent} disabled={isLoading1}>
            Finalizar evento
          </SecondaryButton>
        ) : (
          <PrimaryButton onClick={finishEvent} disabled={isLoading1}>
            Activar evento
          </PrimaryButton>
        )}
      </LoaderComponent>

      <LoaderComponent isLoading={isLoading}>
        <Table<UserEvent>
          data={inscriptions}
          ignoreElements={["user_id", "inscription_id"]}
        >
          <TableColumn<UserEvent>
            key="user_id"
            dataIndex="image"
            title="Foto"
            className="p-0"
            textCenter
            render={({ image, name }) => {
              if (image) {
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
                    src={image}
                    alt={name || "profile picture"}
                  />
                );
              }

              return <MdOutlinePeople />;
            }}
          />
          <TableColumn<UserEvent>
            key="user_id"
            dataIndex="name"
            title="Nombre"
          />
          <TableColumn<UserEvent>
            key="user_id"
            dataIndex="email"
            title="Correo"
          />
          <TableColumn<UserEvent>
            key="user_id"
            dataIndex="participated"
            title="Participación"
            render={({ participated, inscription_id }) => (
              <input
                type="checkbox"
                disabled={!event?.is_active}
                defaultChecked={participated}
                onChange={() => handleInscription(inscription_id)}
              />
            )}
          />
        </Table>
      </LoaderComponent>
    </AdminLayout>
  );
}
