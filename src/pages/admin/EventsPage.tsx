import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";
import { events, EventType } from "../../data/DataWithIcons";

export default function EventsPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl">Eventos</h1>

      <Table<EventType>
        data={events.data}
        ignoreElements={["id"]}
        itemsPerPage={3}
      >
        <TableColumn<EventType>
          key="id"
          dataIndex="image"
          title="Fondo"
          render={({ image, name }) => (
            <img className="h-16 w-16" src={image} alt={name} />
          )}
        />
        <TableColumn<EventType> key="id" dataIndex="name" title="Nombre" />
        <TableColumn<EventType> key="id" dataIndex="date" title="Fecha" />
        <TableColumn<EventType> key="id" dataIndex="site" title="Lugar" />
        <TableColumn<EventType>
          className="flex"
          key="id"
          dataIndex="description"
          title="Descripción"
        />
        <TableColumn<EventType> key="id" dataIndex="entity" title="Entidad" />
        <TableColumn<EventType>
          className="flex min-h-full flex-col items-center justify-center gap-1"
          key="id"
          dataIndex="categories"
          title="Categorias"
          render={({ categories }) => (
            <div className="flex h-full items-center justify-center gap-2">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className={`${index % 2 === 1 ? "bg-red-700" : "bg-gray-600"} rounded-lg px-2 py-1 text-center text-white`}
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        />
      </Table>
    </AdminLayout>
  );
}
