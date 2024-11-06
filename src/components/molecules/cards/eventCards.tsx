import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { PrimaryButton } from "../../atoms/common/Button";
import "./EventCard.css";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  categories: string[];
  imageUrl: string;
  site: string;
  onRegister: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  categories,
  imageUrl,
  site,
  onRegister,
}) => {
  return (
    <div className="event-card">
      <div className="content">
        {/* Parte trasera */}
        <div className="back">
          <div className="back-content">
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
            <p className="date">
              <AiOutlineCalendar /> {date}
            </p>
            <div className="flex w-full justify-center">
              <PrimaryButton onClick={onRegister}>Registrarse</PrimaryButton>
            </div>
          </div>
        </div>

        {/* Parte frontal */}
        <div className="front">
          <div className="img">
            <img src={imageUrl} alt={title} className="image" />
          </div>
          <div className="front-content">
            <small className="badge">{categories.join(", ")}</small>
            <h2 className="title">{title}</h2>
            <p className="site">{site}</p> {/* Nuevo elemento del sitio web */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
