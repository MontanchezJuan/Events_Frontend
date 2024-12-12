import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";
import {
  MdCategory,
  MdHomeFilled,
  MdHomeWork,
  MdLocationOn,
  MdWarning,
} from "react-icons/md";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Event } from "../../api/interfaces/event";
import { FeedBack } from "../../api/interfaces/feedback";
import { Inscription } from "../../api/interfaces/inscription";
import { event_by_id } from "../../api/services/eventsService";
import { list_feedbacks } from "../../api/services/feedbacksService";
import { list_inscriptions } from "../../api/services/inscriptionsService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { GoBack } from "../../components/atoms/common/GoBack";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { FeedbackCard } from "../../components/molecules/cards/FeedbackCard";
import { InscriptionButton } from "../../components/molecules/common/InscriptionButton";
import AdminLayout from "../../components/templates/AdminLayout";
import MainLayout from "../../components/templates/MainLayout";
import useStore from "../../store/useStore";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function ViewEventPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [hasInscription, setHasInscription] = useState<Inscription[] | null>(
    null,
  );
  const [hasFeedback, setHasFeedback] = useState<FeedBack[] | []>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const { name: role } = useStore((store) => store.user.role);
  const user_id = useStore((store) => store.user.id);

  const navigate = useNavigate();

  const { id } = useParams<RouteParams>();

  const get_feedback = async () => {
    if (event && event._id) {
      setHasFeedback(
        await list_feedbacks({
          params: { event_id: event._id, user_id },
          setState: setIsLoadingButton,
        }),
      );
    }
  };

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
    get_feedback();
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
                <Item Icon={MdHomeWork}>
                  <strong>Entidad:</strong> {event.entity}
                </Item>
                <Item Icon={AiFillCalendar}>
                  <strong>Fecha:</strong> {event.date}
                </Item>
                <Item Icon={AiFillClockCircle}>
                  <strong>Hora:</strong> {event.time}
                </Item>
                <Item Icon={MdLocationOn}>
                  <strong>Lugar:</strong> {event.site}
                </Item>
                {event.categories.length > 0 && (
                  <Item Icon={MdCategory}>
                    <strong>Categorias:</strong>
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
                    <strong>Restricciones:</strong>
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

              {role === "user" && (
                <InscriptionButton
                  event={event}
                  hasInscription={hasInscription}
                  hasFeedback={hasFeedback}
                  isLoadingButton={isLoadingButton}
                  setIsLoadingButton={setIsLoadingButton}
                  confirmIsSuscribed={confirmIsSuscribed}
                  get_feedback={get_feedback}
                />
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
            <GoBack />
            <ViewEvent />
            <FeedbackCard event_id={event?._id} />
          </LoaderComponent>
        </AdminLayout>
      );
    case "organizer":
      return (
        <AdminLayout>
          <LoaderComponent isLoading={isLoading}>
            <GoBack />
            <ViewEvent />
            <FeedbackCard event_id={event?._id} />
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
