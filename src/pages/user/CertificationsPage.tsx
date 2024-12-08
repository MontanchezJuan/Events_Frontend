import { useEffect, useState } from "react";
import { MdLocalPlay, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Event } from "../../api/interfaces/event";
import { generate_certificate } from "../../api/services/certificatesService";
import { list_my_events } from "../../api/services/eventsService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import MainLayout from "../../components/templates/MainLayout";

export default function CertificationsPage() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchEvent = async () => {
    const events = await list_my_events({
      params: { participated: true },
      setState: setIsLoading,
    });
    setEvents(events);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const navigateHome = () => {
    navigate("/");
  };

  const handleView = async (id: string | undefined) => {
    if (id) {
      const res = await generate_certificate({
        inscription_id: id,
        setState: setIsLoadingButton,
      });

      if (res) {
        const blob = new Blob([res.data], { type: "application/pdf" });

        const url = window.URL.createObjectURL(blob);

        window.open(url, "_blank");
      }
    }
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="mb-4 text-center text-5xl font-bold">Certificaciones</h1>
        <div className="rounded-lg bg-neutral-500 p-4">
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

                          <div className="max-w-[360px] flex-wrap">
                            <h1 className="text-2xl font-semibold">
                              {event.name}
                            </h1>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <PrimaryButton
                            disabled={isLoadingButton}
                            onClick={() => handleView(event.inscription_id)}
                          >
                            <LoaderComponent isLoading={isLoadingButton}>
                              <MdLocalPlay /> Visualizar certificado
                            </LoaderComponent>
                          </PrimaryButton>
                        </div>
                      </div>
                    ),
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="my-4 text-center text-3xl font-semibold">
                  Actualmente no hay información para mostrar
                </p>
                <PrimaryButton onClick={navigateHome}>
                  <MdSearch /> Encontrar eventos
                </PrimaryButton>
              </div>
            )}
          </LoaderComponent>
        </div>
      </div>
    </MainLayout>
  );
}
