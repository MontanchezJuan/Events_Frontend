import { useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { getSidebarItems } from "../../data/DataWithIcons";
import { useClickOutside } from "../../hooks/useClickOutside";
import useStore from "../../store/useStore";
import { LogoButton } from "../atoms/templates/LogoButton";

const Sidebar = () => {
  const { name: role } = useStore((store) => store.user.role);
  const setIsSidebarOpen = useStore((store) => store.setIsSidebarOpen);
  const { screenSize, isSidebarOpen } = useStore((store) => store.screen);

  const closeMenu = useCallback(() => {
    setIsSidebarOpen(false);
  }, [setIsSidebarOpen]);

  const sidebarRef = useClickOutside(closeMenu);

  const activeLink =
    "flex items-center gap-3 px-4 py-2 m-2 rounded-lg text-white text-md bg-zinc-900 font-semibold";
  const normalLink =
    "flex items-center gap-3 px-4 py-2 m-2 rounded-lg text-md text-zinc-700 border border-white hover:border-zinc-900 font-semibold";

  const sidebarItems = useMemo(() => getSidebarItems(role), [role]);

  return (
    <div
      ref={sidebarRef}
      className={`${isSidebarOpen || screenSize >= 821 ? "flex" : "hidden"} h-screen flex-col overflow-y-auto p-4 pb-10 md:overflow-hidden md:hover:overflow-y-auto`}
    >
      <LogoButton color="text-zinc-900 dark:text-white" />
      <div className="mt-6 flex flex-col gap-2">
        {sidebarItems.map((sidebarItem) => (
          <div key={sidebarItem.title}>
            <p className="uppercase text-zinc-600">
              {isSidebarOpen
                ? sidebarItem.title
                : sidebarItem.title.slice(0, 10)}
            </p>

            {sidebarItem.items.map((item) => (
              <NavLink
                className={({ isActive }) => {
                  if (isSidebarOpen) {
                    return isActive ? activeLink : normalLink;
                  }
                  return `${isActive ? activeLink : normalLink} justify-center`;
                }}
                key={item.name}
                onClick={() => {
                  if (item.func) {
                    item.func();
                  }
                  closeMenu();
                }}
                to={item.path}
              >
                <item.icon className="text-2xl" />

                {isSidebarOpen && (
                  <span className="capitalize">{item.name}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
