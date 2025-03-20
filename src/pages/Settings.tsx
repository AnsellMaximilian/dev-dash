import { TextBox } from "@progress/kendo-react-inputs";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { useEffect, useState } from "react";
import { useDev } from "../hooks/dev";
import { Button } from "@progress/kendo-react-buttons";

export default function Settings() {
  const [tabSelected, setTabSelected] = useState(0);
  const [apiKeyText, setApiKeyText] = useState("");

  const { apiKey, submitApiKey, loading } = useDev();

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
          </div>
        </TabStripTab>
        <TabStripTab title="Basketball">
          <p>
            Basketball is a sport that is played by two teams of five players on
            a rectangular court. The objective is to shoot a ball through a hoop
            18 inches (46 cm) in diameter and mounted at a height of 10 feet
            (3.048 m) to backboards at each end of the court. The game was
            invented in 1891 by Dr. James Naismith, who would be the first
            basketball coach of the Kansas Jayhawks, one of the most successful
            programs in the game's history.
          </p>
        </TabStripTab>
        <TabStripTab title="Football">
          <p>
            Football is a family of team sports that involve, to varying
            degrees, kicking a ball with the foot to score a goal. Unqualified,
            the word football is understood to refer to whichever form of
            football is the most popular in the regional context in which the
            word appears.
          </p>
        </TabStripTab>
      </TabStrip>
    </div>
  );
}
