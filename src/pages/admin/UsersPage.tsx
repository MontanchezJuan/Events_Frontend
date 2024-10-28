import { TableColumn } from "../../components/atoms/common/TableColumn";
import { Table } from "../../components/molecules/common/Table";
import AdminLayout from "../../components/templates/AdminLayout";
import { users, UserType } from "../../data/DataWithIcons";

export default function UsersPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl">Usuarios</h1>

      <Table<UserType>
        data={users.data}
        ignoreElements={["id", "userProfile"]}
        itemsPerPage={3}
      >
        <TableColumn<UserType> key="id" dataIndex="email" title="Email" />
        <TableColumn<UserType> key="id" dataIndex="role" title="Role" />
      </Table>
    </AdminLayout>
  );
}
