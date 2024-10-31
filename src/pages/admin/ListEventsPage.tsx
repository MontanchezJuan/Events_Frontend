import { useNavigate } from "react-router-dom";
import { ButtonWhite } from "../../components/atoms/common/Button";
import { TableButton } from "../../components/atoms/common/TableButton";
import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";
import { events, EventType } from "../../data/DataWithIcons";

export default function ListEventsPage() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <h1 className="text-2xl">Eventos</h1>

      <div className="flex w-full justify-end">
        <ButtonWhite onClick={() => navigate("/event/")}>
          Añadir evento
        </ButtonWhite>
      </div>

      <Table<EventType>
        data={events.data}
        ignoreElements={["id"]}
        itemsPerPage={4}
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
        {/* <TableColumn<EventType>
          className="flex"
          key="id"
          dataIndex="description"
          title="Descripción"
        /> */}
        <TableColumn<EventType> key="id" dataIndex="entity" title="Entidad" />
        <TableColumn<EventType>
          key="id"
          dataIndex="categories"
          title="Categorias"
          render={({ categories }) => (
            <div className="flex min-h-full items-center justify-center gap-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`${index % 2 === 1 ? "bg-red-700" : "bg-gray-600"} rounded-lg px-2 py-1 text-center text-white`}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        />
        <TableColumn
          key="id"
          dataIndex="actions"
          title="Acciones"
          render={() => (
            <div className="flex min-h-full items-center justify-center gap-2">
              <TableButton
                color="blue"
                onClick={() => navigate(`/event/${"si"}`)}
              >
                Editar Evento
              </TableButton>
              <TableButton color="red">Eliminar</TableButton>
            </div>
          )}
        />
      </Table>
    </AdminLayout>
  );
}
