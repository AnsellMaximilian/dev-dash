import { Button } from "@progress/kendo-react-buttons";
import notFoundImg from "../assets/not-found.svg";
import { useMemo, useState } from "react";
import APIKeyDialog from "../components/dashboard/APIKeyDialog";
import { useDev, useDevData } from "../hooks/dev";
import { SvgIcon } from "@progress/kendo-react-common";
import * as svgIcons from "@progress/kendo-svg-icons";
import { FaGithub } from "react-icons/fa";
import {
  TileLayout,
  TileLayoutItem,
  TileLayoutRepositionEvent,
} from "@progress/kendo-react-layout";
import Tile from "../components/dashboard/Tile";

export default function Dashboard() {
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [tileData, setTileData] = useState([
    { col: 1, colSpan: 4, rowSpan: 1 },
    { col: 1, colSpan: 2, rowSpan: 1 },
    { col: 1, colSpan: 2, rowSpan: 2 },
    { col: 4, colSpan: 1, rowSpan: 1 },
    { col: 3, colSpan: 1, rowSpan: 1 },
    { col: 3, colSpan: 1, rowSpan: 1 },
    { col: 4, colSpan: 1, rowSpan: 2 },
    { col: 3, colSpan: 2, rowSpan: 1 },
  ]);
  const { apiKey } = useDev();
  const { devUser } = useDevData();

  const handleReposition = (e: TileLayoutRepositionEvent) => {
    setTileData(e.value);
  };

  const tiles: TileLayoutItem[] = useMemo(
    () => [
      {
        header: "Dev Account",
        body: (
          <Tile metadata={{ loading: devUser.loading, error: devUser.error }}>
            {devUser.data && (
              <div className="d-flex h-100" style={{ gap: 16 }}>
                <div className="d-flex flex-column">
                  <img
                    src={devUser.data.profile_image}
                    alt="Profile"
                    className="rounded-circle d-block"
                    style={{
                      width: 125,
                      height: 125,
                    }}
                  />
                  <div
                    className="d-flex justify-content-center mt-3"
                    style={{ gap: 8 }}
                  >
                    <a
                      href={`https://github.com/${devUser.data.github_username}`}
                      target="_blank"
                      className="d-flex align-items-center icon-btn"
                    >
                      <FaGithub size={24} color="black" />
                    </a>
                    <a
                      href={`https://x.com/${devUser.data.twitter_username}`}
                      target="_blank"
                      className="d-flex align-items-center icon-btn"
                    >
                      <SvgIcon
                        icon={svgIcons.twitterIcon}
                        color="#1DA1F2"
                        size="xlarge"
                      />
                    </a>
                    <a
                      href={devUser.data.website_url}
                      target="_blank"
                      className="d-flex align-items-center icon-btn"
                    >
                      <SvgIcon
                        icon={svgIcons.globeOutlineIcon}
                        color="gray"
                        size="xlarge"
                      />
                    </a>
                  </div>
                </div>
                <div className="d-flex h-100" style={{ gap: 24 }}>
                  <div>
                    <h2 className="h4 m-0">{devUser.data.name}</h2>
                    <a
                      href={`https://dev.to/${devUser.data.username}`}
                      target="_blank"
                      className="small"
                    >
                      @{devUser.data.username}
                    </a>

                    <div className="mt-2 small">
                      {devUser.data.summary || "No summary yet."}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tile>
        ),
      },
      {
        header: "Test 2",
        body: <div>Swagger</div>,
      },
      {
        header: "Test 3",
        body: <div>Swagger</div>,
      },
      {
        header: "Test 4",
        body: <div>Swagger</div>,
      },
      {
        header: "Test 5",
        body: <div>Swagger</div>,
      },
      {
        header: "Test 6",
        body: <div>Swagger</div>,
      },
      {
        header: "Test 7",
        body: <div>Swagger</div>,
      },
      {
        header: "Test 8",
        body: <div>Swagger</div>,
      },
    ],
    [devUser]
  );

  return (
    <div>
      {apiKey ? (
        <div className="">
          <TileLayout
            columns={4}
            rowHeight={255}
            positions={tileData}
            gap={{ rows: 10, columns: 10 }}
            items={tiles}
            onReposition={handleReposition}
          />
        </div>
      ) : (
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
      )}
      <APIKeyDialog setOpen={setApiKeyDialogOpen} open={apiKeyDialogOpen} />
    </div>
  );
}
