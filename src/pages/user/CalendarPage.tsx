import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../api/interfaces/event";
import { list_my_events } from "../../api/services/eventsService";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import MainLayout from "../../components/templates/MainLayout";

export default function CalendarPage() {
  const [dates, setDates] = useState<Date[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [events, setEvents] = useState<Event[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const parseDate = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    return `${day}-${month}-${year}`;
  };

  // Función para generar las fechas del mes
  const generateDates = (year: number, month: number) => {
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth: Date[] = [];
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      daysInMonth.push(new Date(year, month, day));
    }
    setDates(daysInMonth);
  };

  const get_events = async () => {
    const eventsList = await list_my_events({
      params: {
        date: `/${Number(month) + 1}/${year}`,
      },
      setState: setIsLoading,
    });

    setEvents(eventsList);
  };

  // Actualizar las fechas cuando el mes o año cambien
  useEffect(() => {
    generateDates(year, month);
    get_events();
  }, [month, year]);

  const handleOnClick = (currentEvent: Event | null | undefined) => {
    if (currentEvent) {
      navigate(`/events/my-events/${parseDate(currentEvent.date)}`);
    }
  };

  const daysWithEvents = useMemo(
    () =>
      dates.map((date) => {
        const thisDay = date.toLocaleDateString();
        const currentEvent =
          events && events.find((event) => event.date === thisDay);

        return (
          <button
            key={`${date}`}
            className={`rounded-lg py-6 ${
              currentEvent
                ? "bg-[#00ff66] text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
            } `}
            onClick={() => handleOnClick(currentEvent)}
          >
            {date.getDate()}
          </button>
        );
      }),
    [dates, events],
  );

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="mb-4 text-center text-5xl font-bold">Calendario</h1>
        <div className="rounded-lg bg-zinc-500 p-4">
          {/* Seleccionar el mes y año */}
          <div className="mb-4 flex justify-center gap-4">
            {/* Selector de mes */}
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="rounded-xl bg-white p-2 text-black"
            >
              {[
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
              ].map((m, index) => (
                <option key={index} value={index}>
                  {m}
                </option>
              ))}
            </select>
            {/* Selector de año */}
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="rounded-xl bg-white p-2 text-black"
            >
              {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <LoaderComponent isLoading={isLoading}>
            <div className="grid grid-cols-7 gap-2 text-center">
              {/* Encabezado de días de la semana */}
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="font-semibold">
                  {day}
                </div>
              ))}

              {/* Espaciado para los días antes del primer día del mes */}
              {Array.from({ length: dates[0]?.getDay() ?? 0 }).map((_, idx) => (
                <div key={`empty-${idx}`}></div>
              ))}

              {/* Días del mes */}
              {daysWithEvents}
            </div>
          </LoaderComponent>
        </div>
      </div>
    </MainLayout>
  );
}
