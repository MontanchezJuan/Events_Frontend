import { useMemo, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import useStore from "../../../store/useStore";
import { getMenuItemsByRole } from "../../../utils/templates/menuUtils";
import { MenuItems } from "./MenuItems";
import { RoleSwitcher } from "./RoleSwitcher";

export const Menu = () => {
  const user = useStore((store) => store.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = useMemo(() => getMenuItemsByRole(user.role), [user.role]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex items-center">
      {/* Botón del menú hamburguesa */}
      <button className="text-3xl text-white md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? <MdClose /> : <MdMenu />}
      </button>

      {/* Drawer que ocupa toda la pantalla cuando está abierto */}
      <div
        className={`${
          isMenuOpen ? "fixed inset-0" : "hidden"
        } z-50 flex items-center justify-center bg-zinc-900 text-white`}
      >
        {/* Botón para cerrar el menú */}
        <button
          className="absolute right-4 top-4 text-4xl"
          onClick={toggleMenu}
        >
          <MdClose />
        </button>

        {/* Contenido del menú */}
        <div className="flex flex-col items-center gap-6">
          <MenuItems menuItems={menuItems} closeMenu={closeMenu} />
          <RoleSwitcher role={user.role} closeMenu={closeMenu} />
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <MenuItems menuItems={menuItems} closeMenu={closeMenu} />
        <RoleSwitcher role={user.role} closeMenu={closeMenu} />
      </div>
    </div>
  );
};
