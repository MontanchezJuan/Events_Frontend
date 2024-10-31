import { LiaAdSolid } from "react-icons/lia";
import {
  MdAccountCircle,
  MdEvent,
  MdHomeFilled,
  MdOutlinePeople,
} from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { RoleName } from "../api/interfaces/user";
import { NavItem } from "../components/molecules/templates/MenuItems";
import { SidebarItems } from "../interfaces/Sidebar.interfaces";
import { ADMINROUTES } from "../routes/Admin.routes";

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
      path: "/a",
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
            {
              name: "customers",
              icon: RiContactsLine,
              path: "/x",
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

export interface EventType {
  id: string;
  name: string;
  site: string;
  description: string;
  date: string;
  categories: string[];
  entity: string;
  image: string;
}

export const events = {
  message: "Lista de Usuarios encontrada correctamente",
  data: [
    {
      id: "1",
      name: "Los tigres del norte",
      site: "Manizales",
      description:
        "La legendaria banda mexicana estará en la capital con tres emocionantes fechas en el Movistar Arena, marcando un hito en su ya consolidada carrera.",
      date: "20-10-2024",
      categories: ["Music", "Banda"],
      entity: "Universidad de Caldas",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0XHgxfVJ6kBLsBLJz-Y8voBzffoAiA-yO7MJyVCVuIHu4X9oW",
    },
    {
      id: "2",
      name: "Los tigres del norte",
      site: "Manizales",
      description:
        "La legendaria banda mexicana estará en la capital con tres emocionantes fechas en el Movistar Arena, marcando un hito en su ya consolidada carrera.",
      date: "20-10-2024",
      categories: ["Music", "Banda"],
      entity: "Universidad de Caldas",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0XHgxfVJ6kBLsBLJz-Y8voBzffoAiA-yO7MJyVCVuIHu4X9oW",
    },
    {
      id: "3",
      name: "Los tigres del norte",
      site: "Manizales",
      description:
        "La legendaria banda mexicana estará en la capital con tres emocionantes fechas en el Movistar Arena, marcando un hito en su ya consolidada carrera.",
      date: "20-10-2024",
      categories: ["Music", "Banda"],
      entity: "Universidad de Caldas",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0XHgxfVJ6kBLsBLJz-Y8voBzffoAiA-yO7MJyVCVuIHu4X9oW",
    },
    {
      id: "4",
      name: "Los tigres del norte",
      site: "Manizales",
      description:
        "La legendaria banda mexicana estará en la capital con tres emocionantes fechas en el Movistar Arena, marcando un hito en su ya consolidada carrera.",
      date: "20-10-2024",
      categories: ["Music", "Banda"],
      entity: "Universidad de Caldas",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0XHgxfVJ6kBLsBLJz-Y8voBzffoAiA-yO7MJyVCVuIHu4X9oW",
    },
    {
      id: "5",
      name: "Los tigres del norte",
      site: "Manizales",
      description:
        "La legendaria banda mexicana estará en la capital con tres emocionantes fechas en el Movistar Arena, marcando un hito en su ya consolidada carrera.",
      date: "20-10-2024",
      categories: ["Music", "Banda"],
      entity: "Universidad de Caldas",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0XHgxfVJ6kBLsBLJz-Y8voBzffoAiA-yO7MJyVCVuIHu4X9oW",
    },
    {
      id: "6",
      name: "Los tigres del norte",
      site: "Manizales",
      description:
        "La legendaria banda mexicana estará en la capital con tres emocionantes fechas en el Movistar Arena, marcando un hito en su ya consolidada carrera.",
      date: "20-10-2024",
      categories: ["Music", "Banda"],
      entity: "Universidad de Caldas",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0XHgxfVJ6kBLsBLJz-Y8voBzffoAiA-yO7MJyVCVuIHu4X9oW",
    },
  ],
};

export interface UserType {
  id: string;
  email: string;
  role: string | null;
  userProfile: string | null;
}

export const users = {
  message: "Lista de Usuarios encontrada correctamente",
  data: [
    {
      id: "6552486cae29615aecb9786c",
      email: "nicolas@gmail.com",
      role: "admin",
      userProfile: null,
    },
    {
      id: "65667eebcf364b5614f3506d",
      email: "admin@gmail.com",
      role: "admin",
      userProfile: null,
    },
    {
      id: "6552486cae29615aecb9786a",
      email: "nicol@gmail.com",
      role: "admin",
      userProfile: null,
    },
    {
      id: "65667eebcf364b5614f3506b",
      email: "adminuwu@gmail.com",
      role: "admin",
      userProfile: null,
    },
    {
      id: "1552486cae29615aecb9786c",
      email: "nicolas@gmail.com",
      role: "admin",
      userProfile: null,
    },
    {
      id: "25667eebcf364b5614f3506d",
      email: "admin@gmail.com",
      role: null,
      userProfile: null,
    },
    {
      id: "3552486cae29615aecb9786a",
      email: "A@gmail.com",
      role: null,
      userProfile: null,
    },
    {
      id: "45667eebcf364b5614f3506b",
      email: "adminuwu@gmail.com",
      role: null,
      userProfile: null,
    },
  ],
};
