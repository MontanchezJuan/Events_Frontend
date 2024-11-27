/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Event } from "../../api/interfaces/event";
import { User } from "../../api/interfaces/user";
import { list_events } from "../../api/services/eventsService";
import { list_users } from "../../api/services/usersService";
import AdminLayout from "../../components/templates/AdminLayout";
// import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./custom-styles.css";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const userList = await list_users({ setState: setIsLoading });
      setUsers(userList);
      const eventList = await list_events({ setState: setIsLoading });
      setEvents(eventList);
    };

    fetchData();
  }, []);

  const getLastThreeMonthsData = <T extends { [key: string]: any }>(
    data: T[],
    key: string,
  ) => {
    const now = new Date();
    const lastThreeMonths = Array.from({ length: 3 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return {
        month: date.toLocaleString("default", { month: "short" }),
        [key]: data.filter(
          (item) => new Date(item.created_at).getMonth() === date.getMonth(),
        ).length,
      };
    }).reverse();
    return lastThreeMonths;
  };

  const userStats = getLastThreeMonthsData<User>(users, "users");
  const eventStats = getLastThreeMonthsData<Event>(events, "events");

  const deviceData = [
    { name: "Mobile", value: 65 },
    { name: "Desktop", value: 25 },
    { name: "Tablet", value: 10 },
  ];

  const COLORS = ["#00C950", "#0088FE", "#FFBB28", "#FF8042"];

  return (
    <AdminLayout>
      <div className="container">
        <h1 className="title">Bienvenido</h1>

        {/* Tarjetas de Estadísticas Rápidas */}
        <div className="grid-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <h2 className="card-title">Usuarios Totales</h2>
            <p className="card-value text-green">{users.length}</p>
          </div>
          <div className="card">
            <h2 className="card-title">Eventos Totales</h2>
            <p className="card-value text-blue">{events.length}</p>
          </div>
          <div className="card">
            <h2 className="card-title">Conversión</h2>
            <p className="card-value text-yellow">72.5%</p>
          </div>
          <div className="card">
            <h2 className="card-title">Visitas Mensuales</h2>
            <p className="card-value text-purple">15.8K</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Gráfico de Barras - Usuarios */}
          <div className="card">
            <h2 className="card-title">Usuarios en los Últimos 3 Meses</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#8F8F8F" />
                  <YAxis stroke="#8F8F8F" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#00C950" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Barras - Eventos */}
          <div className="card">
            <h2 className="card-title">Eventos en los Últimos 3 Meses</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={eventStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#8F8F8F" />
                  <YAxis stroke="#8F8F8F" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="events" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico Circular - Uso por Dispositivo */}
          <div className="card">
            <h2 className="card-title">Uso por Dispositivo</h2>
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {deviceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
