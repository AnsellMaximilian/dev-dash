import { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { TextBox } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import * as svgIcons from "@progress/kendo-svg-icons";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { SvgIcon } from "@progress/kendo-react-common";
import { useDev } from "../../hooks/dev";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function APIKeyDialog({ open, setOpen }: Props) {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const { submitApiKey } = useDev();

  const handleSumbit = async () => {
    await submitApiKey(apiKey);
    setApiKey("");
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Dialog
          title={"Enter your API key"}
          onClose={() => setOpen((prev) => !prev)}
        >
          <div className="">
            <div className="mb-3">
              <p className="">Dev.to API Key</p>
              <div className="d-flex" style={{ gap: 8 }}>
                <TextBox
                  placeholder="Your API Key"
                  value={apiKey}
                  type={showApiKey ? "text" : "password"}
                  onChange={(e) => setApiKey(e.value as string)}
                />
                <Button
                  onClick={() => setShowApiKey((prev) => !prev)}
                  type="button"
                  svgIcon={
                    showApiKey ? svgIcons.eyeIcon : svgIcons.eyeSlashIcon
                  }
                  className="ms-1 d-block"
                />
              </div>
            </div>
            <div className="d-flex align-items-end" style={{ gap: 4 }}>
              <p className="small mb-0">Why do I need this?</p>
              <Tooltip anchorElement="target" position="top" parentTitle>
                <span title="You will need an API key to access a lot of the features in Dev Dash, including publishing articles, fetching your own articles, etc.">
                  <SvgIcon icon={svgIcons.infoCircleIcon} size="small" />
                </span>
              </Tooltip>
            </div>
          </div>
          <DialogActionsBar>
            <Button
              type="button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-primary"
              onClick={handleSumbit}
              disabled={!apiKey}
            >
              Submit
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
