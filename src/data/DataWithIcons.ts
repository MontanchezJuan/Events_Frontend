import {
  MdAdminPanelSettings,
  MdCalendarMonth,
  MdEvent,
  MdHome,
  MdLocalPlay,
  MdLogout,
  MdManageAccounts,
  MdPeople,
  MdSwitchAccount,
} from "react-icons/md";
import { RoleName } from "../api/interfaces/user";
import { Photo } from "../components/atoms/common/Photo";
import { NavItem } from "../components/molecules/templates/MenuItems";
import { SidebarItems } from "../interfaces/Sidebar.interfaces";
import { ADMINROUTES } from "../routes/Admin.routes";
import { USERROUTES } from "../routes/User.routes";
import useStore from "../store/useStore";

export const getMenuItemsByRole = (role: RoleName): NavItem[] => {
  const commonItems = [{ name: "Inicio", path: "/", icon: MdHome }];

  switch (role) {
    case "user":
      return [
        ...commonItems,
        { name: "Eventos", path: "/events/my-events/", icon: MdEvent },
        {
          name: "Calendario",
          path: USERROUTES.Calendar,
          icon: MdCalendarMonth,
        },
        {
          name: "Certificaciones",
          path: USERROUTES.Certifications,
          icon: MdLocalPlay,
        },
      ];
    case "unauthenticated":
      return commonItems;
    default:
      return [];
  }
};

export const getSidebarItems = (role: RoleName): SidebarItems[] => {
  const paginasItems = [
    {
      name: "inicio",
      icon: MdHome,
      path: "/",
    },
  ];

  const settingsItems = [
    {
      name: "Cuenta",
      icon: Photo,
      path: ADMINROUTES.MY_PROFILE,
    },
    {
      name: "Cerrar sesión",
      icon: MdLogout,
      path: "/logout",
      func: () => {
        localStorage.removeItem("token");
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
              name: "permisos",
              icon: MdManageAccounts,
              path: ADMINROUTES.PERMISSIONS,
            },
            {
              name: "perfiles",
              icon: MdSwitchAccount,
              path: ADMINROUTES.PROFILES,
            },
            {
              name: "roles",
              icon: MdAdminPanelSettings,
              path: ADMINROUTES.ROLES,
            },
            {
              name: "usuarios",
              icon: MdPeople,
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
