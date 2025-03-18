import { ReactNode, useState } from "react";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Drawer,
  DrawerContent,
  DrawerSelectEvent,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";
import { drawerItems } from "../const/common";
import * as svgIcons from "@progress/kendo-svg-icons";
import logo from "../assets/logo.svg";
import UserAvatar from "./UserAvatar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [drawerExpanded, setDrawerExpanded] = useState(true);

  const [selected, setSelected] = useState(
    drawerItems.findIndex((item) => item.selected === true)
  );

  const handleClick = () => {
    setDrawerExpanded((prev) => !prev);
  };

  const onSelect = (e: DrawerSelectEvent) => {
    navigate(e.itemTarget.props.route);
    setSelected(e.itemIndex);
  };

  return (
    <>
      <AppBar>
        <AppBarSection>
          <Button
            svgIcon={svgIcons.gridLayoutIcon}
            fillMode="flat"
            onClick={handleClick}
          />
        </AppBarSection>

        <AppBarSection>
          <img
            src={logo}
            alt="Dev Dash Logo"
            style={{ width: "80px" }}
            className=""
          />
        </AppBarSection>

        <AppBarSpacer />

        <AppBarSection>
          <UserAvatar />
        </AppBarSection>
      </AppBar>

      <Drawer
        expanded={drawerExpanded}
        mode="push"
        position="start"
        mini={true}
        items={drawerItems.map((item, index) => ({
          ...item,
          selected: index === selected,
        }))}
        onSelect={onSelect}
      >
        <DrawerContent>
          {drawerItems.map((item) => {
            return (
              item.selected && (
                <div className="container-fluid py-2" id={item.text}>
                  {children}
                </div>
              )
            );
          })}
        </DrawerContent>
      </Drawer>
    </>
  );
}
