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
import { useDevData } from "../hooks/dev";
import { Loader } from "@progress/kendo-react-indicators";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { devUser } = useDevData();
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
        className="flex-grow-1"
      >
        <DrawerContent className="d-flex flex-column">
          {drawerItems.map((item) => {
            return (
              item.selected && (
                <div
                  className="container-fluid py-2"
                  id={item.text}
                  key={item.text}
                >
                  {devUser.loading ? (
                    <div className="py-5 d-flex justify-content-center align-items-center">
                      <Loader size="large" />
                    </div>
                  ) : devUser.error ? (
                    <div className="py-5 d-flex justify-content-center align-items-center text-center flex-column">
                      <p>
                        You don't seeem to have a valid API key. Go to settings
                        and submit one.
                      </p>
                      <Button
                        onClick={() => {
                          navigate("/settings");
                        }}
                      >
                        Go to Settings
                      </Button>
                    </div>
                  ) : (
                    children
                  )}
                </div>
              )
            );
          })}
        </DrawerContent>
      </Drawer>
    </>
  );
}
