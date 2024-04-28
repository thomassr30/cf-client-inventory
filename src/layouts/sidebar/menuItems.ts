import { IMenuItem } from "interfaces/menuItem.interface";
import { AiOutlineAppstore } from "react-icons/ai";
import { PiUsersFour } from "react-icons/pi";
import { MdOutlineAddLocation } from "react-icons/md"
import { MdOutlineLibraryAdd } from "react-icons/md"
import { AiOutlineContainer } from "react-icons/ai";

export const menuItems: IMenuItem[] = [
  {
    path: "/dashboard/inicio",
    label: "Inicio",
    icon: AiOutlineAppstore,
    roles: ["ADMIN"],
  },
  {
    path: "/dashboard/voluntarios",
    label: "Voluntarios",
    icon: PiUsersFour,
    roles: [
      "ADMIN",
    ],
  },
  {
    path: "/dashboard/locacion",
    label: "Location",
    roles: ["ADMIN", "OFICIAL"],
    icon: MdOutlineAddLocation,
  },
  {
    path: "/dashboard/secciones",
    label: "Secciones",
    roles: ["ADMIN", "OFICIAL"],
    icon: AiOutlineContainer,
  },
  {
    path: "/dashboard/items",
    label: "Items",
    roles: ["ADMIN", "OFICIAL"],
    icon: MdOutlineLibraryAdd,
  },
  
];
