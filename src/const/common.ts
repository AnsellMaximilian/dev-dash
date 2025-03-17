import { DrawerItemProps } from "@progress/kendo-react-layout";
import * as icons from "@progress/kendo-svg-icons";

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
    text: "Followers",
    svgIcon: icons.userIcon,
    route: "/followers",
  },
];
