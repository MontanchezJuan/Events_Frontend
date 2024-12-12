import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../api/interfaces/event";
import { list_events } from "../../api/services/eventsService";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import EventCard from "../../components/molecules/cards/eventCards";
import { EventsFilterForm } from "../../components/molecules/forms/EventsFilterForm";
import MainLayout from "../../components/templates/MainLayout";
import "./LandingPage.css";

export default function LandingPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const get_events = async () => {
      const eventList = await list_events({
        params: { is_active: true },
        setState: setIsLoading,
      });

      setEvents(eventList);
    };

    get_events();
  }, []);

  const handleClick = (eventId: string) => {
    navigate(`/events/event/${eventId}`);
  };

  return (
    <MainLayout>
      {/* Sección de título y barra de búsqueda */}
      <section className="hero-section">
        <div className="new-elements-badge">
          🚀 <span className="new-elements-text">Universidad Futuro</span>
        </div>
        <h1 className="main-title">
          Bienvenidos a la página de eventos Universidad Futuro
        </h1>

        {/* Sección de filtros dentro de cuadro blanco */}
        <div className="flex flex-col rounded-lg bg-zinc-800 p-8">
          <EventsFilterForm setEvents={setEvents} setIsLoading={setIsLoading} />
        </div>
      </section>

      {/* Sección de tarjetas de eventos */}
      <LoaderComponent isLoading={isLoading}>
        <div className="events-container">
          {events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onRegister={() => handleClick(event._id)}
            />
          ))}
        </div>
      </LoaderComponent>
    </MainLayout>
  );
}
