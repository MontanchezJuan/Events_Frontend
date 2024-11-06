import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { Event } from "../../api/interfaces/event";
import { list_events } from "../../api/services/eventsService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import EventCard from "../../components/molecules/cards/eventCards";
import MainLayout from "../../components/templates/MainLayout";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const get_events = async () => {
      const userList = await list_events({ setState: setIsLoading });

      setEvents(userList);
    };

    get_events();
  }, []);

  const handleRegister = (eventTitle: string) => {
    alert(`Te has registrado en ${eventTitle}`);
  };

  const handleSearch = () => {
    alert("Filtros aplicados.");
    // Aquí puedes añadir lógica para filtrar los eventos según los valores seleccionados
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
        <p className="subtitle">
          Aquí encontrarás eventos de todos los tipos. <br />
          Regístrate ahora.
        </p>

        {/* Sección de filtros dentro de cuadro blanco */}
        <div className="filter-box bg-zinc-600">
          <div className="filter-container">
            <div className="filter-item">
              <input
                type="text"
                placeholder="Buscar..."
                className="filter-input"
              />
            </div>
            <div className="filter-item">
              <select className="filter-select">
                <option value="">Categoría</option>
                <option value="conferencia">Conferencia</option>
                <option value="taller">Taller</option>
                <option value="webinar">Webinar</option>
              </select>
            </div>
            <div className="filter-item">
              <select className="filter-select">
                <option value="">Lugar</option>
                <option value="ciudad1">Ciudad 1</option>
                <option value="ciudad2">Ciudad 2</option>
              </select>
            </div>
            <div className="filter-item">
              <input type="date" className="filter-input" />
            </div>
            {/* Botón de búsqueda general */}
            <PrimaryButton onClick={handleSearch}>
              <MdOutlineSearch className="text-[24px]" /> Buscar
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Sección de tarjetas de eventos */}
      <LoaderComponent isLoading={isLoading}>
        <div className="events-container">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.name}
              description={event.description}
              date={event.date}
              imageUrl={event.image}
              categories={event.categories}
              site={event.site}
              onRegister={() => handleRegister(event.name)}
            />
          ))}
        </div>
      </LoaderComponent>
    </MainLayout>
  );
};

export default LandingPage;
