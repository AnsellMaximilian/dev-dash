import { Avatar } from "@progress/kendo-react-layout";
import { useEffect, useRef, useState } from "react";
import { Popup, PopupHandle } from "@progress/kendo-react-popup";
import { useAuth } from "../hooks/auth";
import { Button } from "@progress/kendo-react-buttons";
import { useDevData } from "../hooks/dev";

const kendokaAvatar =
  "https://demos.telerik.com/kendo-react-ui/assets/suite/kendoka-react.png";

export default function UserAvatar() {
  const { user, logoutUser } = useAuth();
  const { devUser } = useDevData();

  const anchor = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<PopupHandle | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        anchor.current &&
        !anchor.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.element.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [show]);

  const onClick = () => {
    setShow((prev) => !prev);
  };

  if (!user) return null;

  return (
    <div>
      <div onClick={onClick} ref={anchor} style={{ cursor: "pointer" }}>
        <Avatar type="image">
          <img
            src={
              devUser.data?.profile_image
                ? devUser.data.profile_image
                : kendokaAvatar
            }
            alt="KendoReact Layout Kendoka Avatar"
          />
        </Avatar>
      </div>
      <Popup
        ref={popupRef}
        anchor={anchor.current}
        show={show}
        popupClass={"p-2 border mt-1"}
        style={{ width: 200 }}
        anchorAlign={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <div className="p-2 d-flex flex-column">
          <div className="fw-bold pb-2 border-bottom">Profile</div>
          <div className="h6 my-2">{user.name}</div>

          <Button
            type="button"
            className="btn btn-outline-primary d-block"
            onClick={() => logoutUser()}
          >
            Logout
          </Button>
        </div>
      </Popup>
    </div>
  );
}
