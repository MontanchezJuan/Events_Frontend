import { useMemo } from "react";
import { getMenuItemsByRole } from "../../../data/DataWithIcons";
import { useDrawer } from "../../../hooks/useDrawer";
import useStore from "../../../store/useStore";
import { Drawer } from "../../organisms/Drawer";
import { MenuItems } from "./MenuItems";
import { RoleSwitcher } from "./RoleSwitcher";

export const NavMenu = () => {
  const { isOpen, toggleDrawer, closeDrawer } = useDrawer();
  const { name: role } = useStore((store) => store.user.role);
  const menuItems = useMemo(() => getMenuItemsByRole(role), [role]);

  return (
    <Drawer
      isOpen={isOpen}
      toggleMenu={toggleDrawer}
      responsive="md:hidden"
      contentClassName="hidden items-center gap-2 md:flex"
    >
      <Drawer.Content>
        <MenuItems menuItems={menuItems} closeMenu={closeDrawer} />
        <RoleSwitcher closeMenu={closeDrawer} />
      </Drawer.Content>
      <Drawer.ResponsiveContent>
        <MenuItems menuItems={menuItems} closeMenu={closeDrawer} />
        <RoleSwitcher closeMenu={closeDrawer} />
      </Drawer.ResponsiveContent>
    </Drawer>
  );
};
