import { useEffect, useState } from "react";
import MainLayout from "../../components/templates/MainLayout";

export default function CalendarPage() {
  const [dates, setDates] = useState<Date[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  // Función para generar las fechas del mes
  const generateDates = (year: number, month: number) => {
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth: Date[] = [];
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      daysInMonth.push(new Date(year, month, day));
    }
    setDates(daysInMonth);
  };

  // Actualizar las fechas cuando el mes o año cambien
  useEffect(() => {
    generateDates(year, month);
  }, [month, year]);

  const today = new Date().toLocaleDateString();

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
            {dates.map((date) => {
              const isToday = date.toLocaleDateString() === today;
              return (
                <div
                  key={`${date}`}
                  className={`rounded-lg p-2 ${
                    isToday
                      ? "bg-[#00ff66] text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
