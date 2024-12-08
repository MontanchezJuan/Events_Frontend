import { AiOutlineCalendar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../api/interfaces/notification";

export const NotificationComponent = ({
  notification,
}: {
  notification: Notification;
}) => {
  const {
    date,
    notification_type,
    event_image,
    event_name,
    message,
    event_id,
  } = notification;

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/events/event/${event_id}`);
  };

  return (
    <div
      className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg p-2 text-zinc-700 ${notification_type === "anuncio" && "bg-lime-300"} ${notification_type === "agenda" && "bg-cyan-300"} ${notification_type === "recordatorio" && "bg-orange-300"} `}
      onClick={handleOnClick}
    >
      <div className="text-lg font-bold uppercase">{notification_type}</div>
      <div className="flex items-center gap-2">
        <img className="h-12 w-12 rounded-full" src={event_image} />
        <div className="flex flex-col">
          <span className="font-semibold">{event_name}</span>
          <span className="max-h-[60px] overflow-hidden text-gray-600">
            {message}
          </span>
        </div>
      </div>
      <p className="flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-sm text-zinc-800">
        <AiOutlineCalendar />

        {date}
      </p>
    </div>
  );
};
