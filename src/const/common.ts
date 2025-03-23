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
    text: "Library",
    svgIcon: icons.bookIcon,
    route: "/library",
  },
  {
    separator: true,
  },
  {
    text: "Your Posts",
    svgIcon: icons.stickyNoteIcon,
    route: "/articles",
  },
  {
    separator: true,
  },
  // {
  //   text: "Badge Progress",
  //   svgIcon: icons.shapesIcon,
  //   route: "/badge-progress",
  // },
  // {
  //   separator: true,
  // },
  // {
  //   text: "Public Profile",
  //   svgIcon: icons.userIcon,
  //   route: "/public-profile",
  // },
  // {
  //   separator: true,
  // },
  {
    text: "Settings",
    svgIcon: icons.gearIcon,
    route: "/settings",
  },
];
export const libraryColors = [
  "#FF5733", // Bright Orange
  "#C70039", // Crimson Red
  "#900C3F", // Deep Magenta
  "#FFC300", // Golden Yellow
  "#DAF7A6", // Light Lime Green
  "#3498DB", // Vivid Blue
  "#1ABC9C", // Turquoise
  "#8E44AD", // Rich Purple
  "#16A085", // Deep Teal
  "#D35400", // Burnt Orange
];
export const defaultTileData = [
  {
    order: 0,
    rowSpan: 1,
    colSpan: 2,
    col: 1,
  },
  {
    order: 1,
    rowSpan: 1,
    colSpan: 2,
    col: 3,
  },
  {
    order: 2,
    rowSpan: 2,
    colSpan: 4,
    col: 1,
  },
];
