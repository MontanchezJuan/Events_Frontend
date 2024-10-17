import { LiaAdSolid } from "react-icons/lia";
import { MdHomeFilled } from "react-icons/md";
import { Item } from "../../components/molecules/templates/MenuItems";
import { COMMON_ROUTES } from "../../routes/common.routes";

export const getMenuItemsByRole = (role: string): Item[] => {
  const commonItems = [
    { name: "Inicio", path: COMMON_ROUTES.LANDING, icon: MdHomeFilled },
  ];

  switch (role) {
    case "admin":
      return [
        ...commonItems,
        { name: "Eventos", path: "/", icon: LiaAdSolid },
        { name: "Usuarios", path: "/", icon: LiaAdSolid },
      ];
    case "organo":
      return commonItems;
    case "user":
      return [
        ...commonItems,
        { name: "Eventos", path: "/", icon: LiaAdSolid },
        { name: "Calendario", path: "/", icon: LiaAdSolid },
        { name: "Certificaciones", path: "/", icon: LiaAdSolid },
      ];
    default:
      return commonItems;
  }
};
