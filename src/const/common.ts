import { DrawerItemProps } from "@progress/kendo-react-layout";
import * as icons from "@progress/kendo-svg-icons";

export const API_BASE_URL = "https://dev.to/api";

export const drawerItems: DrawerItemProps[] = [
  {
    text: "Home",
    svgIcon: icons.homeIcon,
    selected: true,
    route: "",
  },
  {
    separator: true,
  },
  {
    text: "Posts",
    svgIcon: icons.stickyNoteIcon,
    route: "/posts",
  },
  {
    separator: true,
  },
  {
    text: "Settings",
    svgIcon: icons.gearIcon,
    route: "/settings",
  },
];
