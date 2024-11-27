import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
  MdCalendarMonth,
  MdCategory,
  MdHomeFilled,
  MdHomeWork,
  MdLocationOn,
  MdWarning,
} from "react-icons/md";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Event } from "../../api/interfaces/event";
import { Inscription } from "../../api/interfaces/inscription";
import { event_by_id } from "../../api/services/eventsService";
import {
  create_inscription,
  delete_inscription,
  list_inscriptions,
} from "../../api/services/inscriptionsService";
import {
  ButtonBorder,
  PrimaryButton,
  SecondaryButton,
} from "../../components/atoms/common/Button";
import { Loader } from "../../components/atoms/common/Loader";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import AdminLayout from "../../components/templates/AdminLayout";
import MainLayout from "../../components/templates/MainLayout";
import useStore from "../../store/useStore";
import { Alert } from "../../utils/swal";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function ViewEventPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [hasInscription, setHasInscription] = useState<Inscription[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const { name: role } = useStore((store) => store.user.role);
  const user_id = useStore((store) => store.user.id);

  const navigate = useNavigate();

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        setEvent(await event_by_id({ id, setState: setIsLoading }));
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    confirmIsSuscribed();
  }, [event]);

  const confirmIsSuscribed = async () => {
    if (event) {
      setHasInscription(
        await list_inscriptions({
          setState: setIsLoadingButton,
          params: { user_id, event_id: event._id },
        }),
      );
    }
  };

  const handleSuscribe = async () => {
    if (localStorage.getItem("token") && event) {
      const inscription = await create_inscription({
        newData: { event_id: event._id, user_id },
        setState: setIsLoadingButton,
      });
      confirmIsSuscribed();
      if (inscription) {
        Alert({
          title: "Ok",
          text: inscription.message,
          icon: "success",
        });
      }
    } else {
      localStorage.setItem("last-route", "");
    }
  };

  const handleUnsuscribe = async () => {
    if (event) {
      Alert({
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, cancelar la suscripción",
        icon: "question",
        showCancelButton: true,
        text: `Estás seguro que deseas cancelar la suscripción en el evento: ${event.name}`,
        title: "Alerta",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          if (localStorage.getItem("token") && hasInscription) {
            const resquest = async () => {
              const message = await delete_inscription({
                id: hasInscription[0]._id,
                setState: setIsLoadingButton,
              });
              confirmIsSuscribed();
              if (message) {
                Alert({
                  title: "Ok",
                  text: message,
                  icon: "success",
                });
              }
            };
            resquest();
          } else {
            localStorage.setItem("last-route", "");
          }
        }
      });
    }
  };

  const Item = ({
    children,
    Icon,
  }: {
    children: React.ReactNode;
    Icon: IconType;
  }) => (
    <div className="flex flex-wrap items-center gap-2">
      <Icon className="text-2xl text-[#00ff66]" />
      {children}
    </div>
  );

  const ViewEvent = () => (
    <>
      {event ? (
        <div className="flex flex-col gap-8 p-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold">{event.name}</h1>
          </div>

          <section className="flex min-w-full gap-12">
            <img className="w-1/2" src={event.image} alt={event.name} />

            <div className="flex w-1/2 flex-col justify-between p-4">
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold">Información general</p>
                <Item Icon={MdHomeWork}>Entidad: {event.entity}</Item>
                <Item Icon={MdCalendarMonth}>Fecha: {event.date}</Item>
                <Item Icon={MdLocationOn}>Lugar: {event.site}</Item>
                {event.categories.length > 0 && (
                  <Item Icon={MdCategory}>
                    Categorias:
                    {event.categories.map((category, index) => (
                      <div
                        key={index}
                        className="rounded-3xl bg-[#00ff66] px-2 py-1 font-bold text-black"
                      >
                        {category}
                      </div>
                    ))}
                  </Item>
                )}
                {event.restrictions.length > 0 && (
                  <Item Icon={MdWarning}>
                    Restricciones:
                    {event.restrictions.map((category, index) => (
                      <div
                        key={index}
                        className="rounded-3xl bg-[#FF9F00] px-2 py-1 font-bold text-black"
                      >
                        {category}
                      </div>
                    ))}
                  </Item>
                )}
              </div>
              {hasInscription === null ? (
                <ButtonBorder>
                  <Loader size={40} />
                </ButtonBorder>
              ) : hasInscription.length === 0 ? (
                <PrimaryButton
                  disabled={isLoadingButton}
                  onClick={handleSuscribe}
                >
                  <LoaderComponent isLoading={isLoadingButton}>
                    Inscribirme
                  </LoaderComponent>
                </PrimaryButton>
              ) : (
                <SecondaryButton
                  disabled={isLoadingButton}
                  onClick={handleUnsuscribe}
                >
                  <LoaderComponent isLoading={isLoadingButton}>
                    Cancelar inscripción
                  </LoaderComponent>
                </SecondaryButton>
              )}
            </div>
          </section>

          <section className="flex flex-col">
            <p className="text-xl font-semibold">Descripción del evento:</p>

            <div className="flex min-w-full">{event.description}</div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 p-4">
          <div className="w-2/3 text-center">
            <h1 className="text-5xl font-bold">
              Lo sentimos, algo salió mal. Inténtalo de nuevo más tarde
            </h1>
          </div>

          <PrimaryButton onClick={() => navigate("/")}>
            <MdHomeFilled />
            Volver al inicio
          </PrimaryButton>
        </div>
      )}
    </>
  );

  switch (role) {
    case "admin":
      return (
        <AdminLayout>
          <LoaderComponent isLoading={isLoading}>
            <ViewEvent />
          </LoaderComponent>
        </AdminLayout>
      );
    case "user":
      return (
        <MainLayout>
          <LoaderComponent isLoading={isLoading}>
            <ViewEvent />
          </LoaderComponent>
        </MainLayout>
      );

    default:
      return <Navigate to="/" />;
  }
}
