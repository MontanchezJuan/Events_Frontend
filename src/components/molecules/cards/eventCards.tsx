import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Event } from "../../../api/interfaces/event";
import { PrimaryButton } from "../../atoms/common/Button";
import "./EventCard.css";

interface EventCardProps {
  event: Event;
  onRegister: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const { name, date, image, site } = event;

  return (
    <div className="flex flex-col rounded-lg bg-zinc-800">
      <img src={image} alt={name} className="w-[280px] rounded-md" />

      <div className="flex flex-col gap-1 p-4">
        <div className="flex h-[56px] max-w-[200px] overflow-hidden text-wrap">
          <h2 className="text-lg">{name}</h2>
        </div>

        <p className="flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-500">
          <MdLocationOn />

          {site}
        </p>

        <p className="mb-1 flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-500">
          <AiOutlineCalendar />

          {date}
        </p>

        <div className="flex w-full justify-center">
          <PrimaryButton onClick={onRegister}>Visualizar evento</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
