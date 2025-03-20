import { Button } from "@progress/kendo-react-buttons";
import notFoundImg from "../assets/not-found.svg";
import { useMemo, useState } from "react";
import APIKeyDialog from "../components/dashboard/APIKeyDialog";
import { useDev, useDevData } from "../hooks/dev";
import {
  TileLayout,
  TileLayoutItem,
  TileLayoutRepositionEvent,
} from "@progress/kendo-react-layout";
import Tile from "../components/dashboard/Tile";

export default function Dashboard() {
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [tileData, setTileData] = useState([
    { col: 1, colSpan: 3, rowSpan: 1 },
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
              <div
                className="d-flex align-items-center h-100"
                style={{ gap: 16 }}
              >
                <img
                  src={devUser.data.profile_image}
                  alt="Profile"
                  className="rounded-circle d-block"
                  style={{
                    width: 125,
                  }}
                />
                <div className="d-flex" style={{ gap: 8 }}>
                  <dl>
                    <dt className="small">
                      <strong>Name</strong>
                    </dt>
                    <dd>{devUser.data.name}</dd>
                    <dt className="small">
                      <strong>Username</strong>
                    </dt>
                    <dd>@{devUser.data.username}</dd>
                  </dl>
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
