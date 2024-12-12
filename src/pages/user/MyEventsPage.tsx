import { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdSearch, MdVisibility } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Event } from "../../api/interfaces/event";
import { list_my_events } from "../../api/services/eventsService";
import { delete_inscription } from "../../api/services/inscriptionsService";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../components/atoms/common/Button";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { NotData } from "../../components/atoms/common/NotData";
import MainLayout from "../../components/templates/MainLayout";
import { Alert } from "../../utils/swal";

interface RouteParams extends Record<string, string | undefined> {
  date: string;
}

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const navigate = useNavigate();

  const { date } = useParams<RouteParams>();

  const parseDate = (dateString: string): string => {
    const [day, month, year] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const fetchEvent = async () => {
    if (date) {
      const events = await list_my_events({
        params: { date: parseDate(date) },
        setState: setIsLoading,
      });
      setEvents(events);
    } else {
      const events = await list_my_events({ setState: setIsLoading });
      setEvents(events);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [date]);

  const navigateHome = () => {
    navigate("/");
  };

  const handleView = (id: string) => {
    navigate(`/events/event/${id}`);
  };

  const handleUnsuscribe = async (id: string, name: string) => {
    Alert({
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, cancelar la suscripción",
      icon: "question",
      showCancelButton: true,
      text: `Estás seguro que deseas cancelar la suscripción en el evento: ${name}`,
      title: "Alerta",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        const resquest = async () => {
          const message = await delete_inscription({
            id,
            setState: setIsLoadingButton,
          });
          if (message) {
            fetchEvent();
            Alert({
              title: "Ok",
              text: message,
              icon: "success",
            });
          }
        };

        resquest();
      }
    });
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="mb-4 text-center text-5xl font-bold">Mis eventos</h1>

        <p className="mb-4 text-xl">
          Aquí se mostrarán los eventos a los que te suscribas.
        </p>

        <LoaderComponent isLoading={isLoading}>
          {events ? (
            <div className="flex flex-col gap-4">
              {events.map(
                (event) =>
                  event && (
                    <div
                      className="flex min-w-full flex-col justify-between gap-4 rounded-lg bg-zinc-800 p-4 md:flex-row"
                      key={event._id}
                    >
                      <div className="flex flex-col items-center gap-4 md:flex-row">
                        <img
                          className="h-[240px] w-[240px] md:h-[160px] md:w-[160px]"
                          src={
                            event.image
                              ? event.image
                              : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Logo_de_la_Universidad_de_Caldas.svg/2044px-Logo_de_la_Universidad_de_Caldas.svg.png"
                          }
                          alt={event.name}
                        />

                        <div className="rounded-md bg-zinc-900/50 p-4">
                          <p className="flex items-center gap-2 text-xl font-medium">
                            <AiOutlineCalendar className="text-[#00ff66]" />{" "}
                            Fecha evento:
                          </p>
                          <p className="gap-2 text-center text-xl font-medium">
                            {event.date}
                          </p>
                        </div>

                        <div className="max-w-[360px] flex-wrap">
                          <h1 className="text-2xl font-semibold">
                            {event.name}
                          </h1>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <PrimaryButton
                          disabled={isLoadingButton}
                          onClick={() => handleView(event._id)}
                        >
                          <LoaderComponent isLoading={isLoadingButton}>
                            <MdVisibility /> Visualizar evento
                          </LoaderComponent>
                        </PrimaryButton>
                        {event.is_active && (
                          <SecondaryButton
                            disabled={isLoadingButton}
                            onClick={() =>
                              event.inscription_id &&
                              handleUnsuscribe(event.inscription_id, event.name)
                            }
                          >
                            <LoaderComponent isLoading={isLoadingButton}>
                              Cancelar inscripción
                            </LoaderComponent>
                          </SecondaryButton>
                        )}
                      </div>
                    </div>
                  ),
              )}
            </div>
          ) : (
            <NotData>
              <PrimaryButton onClick={navigateHome}>
                <MdSearch /> Encontrar eventos
              </PrimaryButton>
            </NotData>
          )}
        </LoaderComponent>
      </div>
    </MainLayout>
  );
}
