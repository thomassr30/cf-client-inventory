import { Roles } from "@/utils/roles.type";

type IconComponent = React.FunctionComponent<{
  size: number;
  className: string;
}>;

export interface IMenuItem {
  path: string;
  label: string;
  icon: IconComponent;
  iconRow?: IconComponent;
  roles: Roles[];
  subMenu?: { path: string; label: string; roles: Roles[] }[];
}
