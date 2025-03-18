import { Avatar } from "@progress/kendo-react-layout";
import { useEffect, useRef, useState } from "react";
import { Popup, PopupHandle } from "@progress/kendo-react-popup";
import { useAuth } from "../hooks/auth";
import { Button } from "@progress/kendo-react-buttons";

const kendokaAvatar =
  "https://demos.telerik.com/kendo-react-ui/assets/suite/kendoka-react.png";

export default function UserAvatar() {
  const { user, logoutUser } = useAuth();

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
          <img src={kendokaAvatar} alt="KendoReact Layout Kendoka Avatar" />
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
        <div className="h6">{user.name}</div>

        <Button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => logoutUser()}
        >
          Logout
        </Button>
      </Popup>
    </div>
  );
}
