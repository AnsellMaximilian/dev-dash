import { Button } from "@progress/kendo-react-buttons";
import notFoundImg from "../assets/not-found.svg";
import { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function Dashboard() {
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);

  return (
    <div>
      <div className="d-flex flex-column align-items-center py-5 px-4">
        <img
          src={notFoundImg}
          className="mw-100 d-block mx-auto"
          alt="Not found image"
          style={{ width: 400 }}
        />
        <p className="text-center h4 mt-3">
          You haven't submitted your API key yet.
        </p>
        <p className="text-center">
          You can start tracking your account once you've submitted an API key
          from your DEV account.
        </p>
        <Button
          type="button"
          className="btn-primary my-1"
          onClick={() => {
            setApiKeyDialogOpen(true);
          }}
        >
          Submit One
        </Button>
      </div>

      {apiKeyDialogOpen && (
        <Dialog
          title={"Please confirm"}
          onClose={() => setApiKeyDialogOpen((prev) => !prev)}
        >
          <p style={{ margin: "25px", textAlign: "center" }}>
            Are you sure you want to continue?
          </p>
          <DialogActionsBar>
            <Button type="button" onClick={() => {}}>
              No
            </Button>
            <Button type="button" onClick={() => {}}>
              Yes
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
}
