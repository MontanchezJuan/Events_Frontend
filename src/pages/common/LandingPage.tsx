import React from 'react';
import MainLayout from "../../components/templates/MainLayout";
import EventCard from '../../components/molecules/cards/eventCards';
import { events } from '../../data/DataWithIcons';
import './LandingPage.css';

const LandingPage: React.FC = () => {
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
        <h1 className="main-title">Bienvenidos a la página de eventos Universidad Futuro</h1>
        <p className="subtitle">
          Aquí encontrarás eventos de todos los tipos. <br />
          Regístrate ahora.
        </p>

        {/* Sección de filtros dentro de cuadro blanco */}
        <div className="filter-box">
          <div className="filter-container">
            <div className="filter-item">
              <input
                type="text"
                placeholder="Buscar..."
                className="filter-input"
              />
              <button className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5-5m-5 5L5 5m10 5a7 7 0 110-14 7 7 0 010 14z" />
                </svg>
              </button>
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
              <input
                type="date"
                className="filter-input"
              />
            </div>

            {/* Botón de búsqueda general */}
            <button className="apply-button" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Sección de tarjetas de eventos */}
      <div className="events-container">
        {events.data.map((event, index) => (
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
    </MainLayout>
  );
};

export default LandingPage;
