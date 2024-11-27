import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { Event } from "../../../api/interfaces/event";
import { PrimaryButton } from "../../atoms/common/Button";
import "./EventCard.css";

interface EventCardProps {
  event: Event;
  onRegister: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const { name, date, categories, image, site } = event;
  return (
    <div className="event-card">
      <div className="content">
        {/* Parte trasera */}
        <div className="back">
          <div className="back-content">
            <h2 className="title">{name}</h2>
            <p className="date">
              <AiOutlineCalendar /> {date}
            </p>
            <p className="site mb-4">{site}</p>
            <div className="flex w-full justify-center">
              <PrimaryButton onClick={onRegister}>
                Visualizar evento
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Parte frontal */}
        <div className="front">
          <div className="img">
            <img src={image} alt={name} className="image" />
          </div>
          <div className="front-content">
            <small className="badge">{categories.join(", ")}</small>
            <h2 className="title">{name}</h2>
            <p className="date">
              <AiOutlineCalendar /> {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
