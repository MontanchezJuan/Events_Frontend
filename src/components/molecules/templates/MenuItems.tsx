import { NavLink } from "react-router-dom";

export interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface MenuItemsProps {
  menuItems: NavItem[];
  closeMenu: () => void;
}

export const MenuItems = ({ menuItems, closeMenu }: MenuItemsProps) => {
  return menuItems.map((item, index) => (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `${isActive ? "text-[#00ff66]" : "text-white transition-colors duration-700 hover:text-[#00ff66]"} flex items-center gap-1`
      }
      key={`${item.name + index}`}
      onClick={closeMenu}
    >
      <item.icon />
      {item.name}
    </NavLink>
  ));
};
