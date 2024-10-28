import { MdOutlinePeople } from "react-icons/md";
import { useDrawer } from "../../../hooks/useDrawer";
import { Drawer } from "../Drawer";

export const DashboardMenu = () => {
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();

  const items = [
    { name: "Usuarios", icon: MdOutlinePeople },
    { name: "users", icon: MdOutlinePeople },
    { name: "users", icon: MdOutlinePeople },
    { name: "users", icon: MdOutlinePeople },
  ];

  return (
    <div className="flex justify-center">
      <Drawer
        contentClassName="hidden flex-col space-y-2 rounded-lg p-4 shadow-md sm:flex"
        isOpen={isOpen}
        responsive="sm:hidden"
        title="Carlos"
        toggleMenu={toggleDrawer}
      >
        <Drawer.Content>
          {items.map((item, index) => (
            <button
              className="flex items-center gap-1 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              key={item.name + index}
              onClick={closeDrawer}
            >
              <item.icon className="text-xl" />
              {item.name}
            </button>
          ))}
        </Drawer.Content>
      </Drawer>
    </div>
  );
};
