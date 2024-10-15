import { Link } from "react-router-dom";
import { UnderlineText } from "../../atoms/common/UnderlineText";

export interface Item {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface MenuItemsProps {
  menuItems: Item[];
  closeMenu: () => void;
}

export const MenuItems = ({ menuItems, closeMenu }: MenuItemsProps) => {
  return (
    <>
      {menuItems.map((item, index) => (
        <Link to={item.path} key={`${item.name + index}`} onClick={closeMenu}>
          <UnderlineText color="after:bg-white" size="lg">
            <item.icon className="mr-1 inline-block" /> {item.name}
          </UnderlineText>
        </Link>
      ))}
    </>
  );
};
