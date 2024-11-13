import { useEffect, useState } from "react";
import AdminLayout from "../../components/templates/AdminLayout";
import { list_users } from "../../api/services/usersService";
import { list_events } from "../../api/services/eventsService";
import { User } from "../../api/interfaces/user";
import { Event } from "../../api/interfaces/event";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userList = await list_users({ setState: setIsLoading });
      const eventList = await list_events({ setState: setIsLoading });
      setUsers(userList);
      setEvents(eventList);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getLastThreeMonthsData = (data: any[], key: string) => {
    const now = new Date();
    const lastThreeMonths = Array.from({ length: 3 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return {
        month: date.toLocaleString('default', { month: 'short' }),
        [key]: data.filter(item => new Date(item.created_at).getMonth() === date.getMonth()).length
      };
    }).reverse();
    return lastThreeMonths;
  };

  const userStats = getLastThreeMonthsData(users, 'users');
  const eventStats = getLastThreeMonthsData(events, 'events');

  return (
    <AdminLayout>
      <LoaderComponent isLoading={isLoading}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Bienvenido, Administrador</h1>
          <p className="mt-2">Aquí tienes un resumen de la actividad reciente:</p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-black p-4 shadow-md">
              <h2 className="text-xl font-semibold">Usuarios Creados en los Últimos 3 Meses</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-lg bg-black p-4 shadow-md">
              <h2 className="text-xl font-semibold">Eventos Creados en los Últimos 3 Meses</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eventStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="events" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </LoaderComponent>
    </AdminLayout>
  );
};

export default Dashboard;