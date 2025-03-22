import { DrawerItemProps } from "@progress/kendo-react-layout";
import * as icons from "@progress/kendo-svg-icons";

export const API_BASE_URL = "https://dev.to/api";

export const drawerItems: DrawerItemProps[] = [
  {
    text: "Home",
    svgIcon: icons.homeIcon,
    selected: true,
    route: "/",
  },
  {
    separator: true,
  },
  {
    text: "Feed",
    svgIcon: icons.fileHeaderIcon,
    route: "/feed",
  },
  {
    separator: true,
  },
  {
    text: "Articles",
    svgIcon: icons.stickyNoteIcon,
    route: "/articles",
  },
  {
    separator: true,
  },
  {
    text: "Badge Progress",
    svgIcon: icons.shapesIcon,
    route: "/badge-progress",
  },
  {
    separator: true,
  },
  {
    text: "Public Profile",
    svgIcon: icons.userIcon,
    route: "/public-profile",
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
