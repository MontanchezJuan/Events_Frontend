import { LiaAdSolid } from "react-icons/lia";
import {
  MdAccountCircle,
  MdEvent,
  MdHomeFilled,
  MdLogout,
  MdOutlinePeople,
} from "react-icons/md";
import { RoleName } from "../api/interfaces/user";
import { NavItem } from "../components/molecules/templates/MenuItems";
import { SidebarItems } from "../interfaces/Sidebar.interfaces";
import { ADMINROUTES } from "../routes/Admin.routes";
import useStore from "../store/useStore";

export const getMenuItemsByRole = (role: RoleName): NavItem[] => {
  const commonItems = [{ name: "Inicio", path: "/", icon: MdHomeFilled }];

  switch (role) {
    case "user":
      return [
        ...commonItems,
        { name: "Eventos", path: "/", icon: LiaAdSolid },
        { name: "Calendario", path: "/", icon: LiaAdSolid },
        { name: "Certificaciones", path: "/", icon: LiaAdSolid },
      ];
    case "unauthenticated":
      return [...commonItems];
    default:
      return [];
  }
};

export const getSidebarItems = (role: RoleName): SidebarItems[] => {
  const paginasItems = [
    {
      name: "inicio",
      icon: MdHomeFilled,
      path: "/",
    },
  ];

  const settingsItems = [
    {
      name: "Cuenta",
      icon: MdAccountCircle,
      path: ADMINROUTES.PROFILE,
    },
    {
      name: "Cerrar sesión",
      icon: MdLogout,
      path: "/logout",
      func: () => {
        useStore.getState().resetUser();
      },
    },
  ];

  switch (role) {
    case "organizer":
      return [
        {
          title: "paginas",
          items: [
            ...paginasItems,
            {
              name: "mis eventos",
              icon: MdEvent,
              path: ADMINROUTES.EVENTS,
            },
          ],
        },
        {
          title: "Configuraciones",
          items: [...settingsItems],
        },
      ];
    case "admin":
      return [
        {
          title: "paginas",
          items: [
            ...paginasItems,
            {
              name: "eventos",
              icon: MdEvent,
              path: ADMINROUTES.EVENTS,
            },
            {
              name: "usuarios",
              icon: MdOutlinePeople,
              path: ADMINROUTES.USERS,
            },
          ],
        },
        {
          title: "Configuraciones",
          items: [...settingsItems],
        },
      ];

    default:
      return [];
  }
};
