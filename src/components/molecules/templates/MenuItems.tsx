import { Link } from "react-router-dom";
import { UnderlineText } from "../../atoms/common/UnderlineText";

export interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface MenuItemsProps {
  menuItems: NavItem[];
  closeMenu: () => void;
  type: "Link" | "Button";
}

export const MenuItems = ({ menuItems, closeMenu, type }: MenuItemsProps) => {
  if (type === "Button") {
    return menuItems.map((item, index) => (
      <button key={`${item.name + index}`} onClick={closeMenu}>
        <UnderlineText
          text={item.name}
          color="after:bg-white"
          size="lg"
          icon={<item.icon className="mr-1 inline-block" />}
        />
      </button>
    ));
  }

  return menuItems.map((item, index) => (
    <Link to={item.path} key={`${item.name + index}`} onClick={closeMenu}>
      <UnderlineText
        text={item.name}
        color="after:bg-white"
        size="lg"
        icon={<item.icon className="mr-1 inline-block" />}
      />
    </Link>
  ));
};
