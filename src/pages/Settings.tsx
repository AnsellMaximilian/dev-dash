import { TextBox } from "@progress/kendo-react-inputs";
import { SvgIcon } from "@progress/kendo-react-common";
import * as svgIcons from "@progress/kendo-svg-icons";

import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { useEffect, useState } from "react";
import { useDev, useDevData } from "../hooks/dev";
import { Button } from "@progress/kendo-react-buttons";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { Loader } from "@progress/kendo-react-indicators";

export default function Settings() {
  const [tabSelected, setTabSelected] = useState(0);
  const [apiKeyText, setApiKeyText] = useState("");

  const { apiKey, submitApiKey, loading } = useDev();
  const { devUser } = useDevData();

  useEffect(() => {
    if (apiKey) {
      setApiKeyText(apiKey);
    }
  }, [apiKey]);

  const handleTabSelect = (e: TabStripSelectEventArguments) => {
    setTabSelected(e.selected);
  };

  const handleApiKeyChange = async () => {
    // await submitApiKey(apiKeyText);
    await submitApiKey(apiKeyText);
  };

  return (
    <div>
      <h1 className="h3">Settings</h1>

      <TabStrip
        selected={tabSelected}
        onSelect={handleTabSelect}
        className="w-100"
      >
        <TabStripTab title="Dev Account">
          <div>
            <div className="mb-2 h6">API Key</div>
            <div className="d-flex align-items-center" style={{ gap: 8 }}>
              <TextBox
                placeholder="API Key"
                value={apiKeyText}
                onChange={(e) => setApiKeyText(e.value as string)}
              />
              <Button
                disabled={apiKey === apiKeyText || !apiKeyText || loading}
                onClick={handleApiKeyChange}
              >
                Change
              </Button>
              <Tooltip anchorElement="target" position="top" parentTitle>
                <div
                  title={
                    devUser.loading
                      ? "Loading..."
                      : devUser.error
                      ? "This API key is invalid"
                      : "This API key is valid"
                  }
                >
                  {devUser.loading ? (
                    <Loader />
                  ) : (
                    <SvgIcon
                      icon={
                        devUser.error
                          ? svgIcons.xCircleIcon
                          : svgIcons.checkCircleIcon
                      }
                      size="xlarge"
                      color={devUser.error ? "red" : "green"}
                    />
                  )}
                </div>
              </Tooltip>
            </div>
            {devUser.data ? (
              <>
                <div className="mt-4">
                  <h2 className="h4">Dev Account</h2>
                  <div>{devUser.data?.name}</div>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <p className="small">
                  Once you've submitted a valid API key, your Dev.to data will
                  show up here.
                </p>
              </div>
            )}
          </div>
        </TabStripTab>
        <TabStripTab title="Other Setting">
          <p>Other setting</p>
        </TabStripTab>
      </TabStrip>
    </div>
  );
}
