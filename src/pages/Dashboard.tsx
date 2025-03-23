import { useEffect, useMemo, useState } from "react";
import { useDevData } from "../hooks/dev";
import { SvgIcon } from "@progress/kendo-react-common";
import * as svgIcons from "@progress/kendo-svg-icons";
import { useDebounce } from "use-debounce";

import { FaGithub } from "react-icons/fa";
import {
  TileLayout,
  TileLayoutItem,
  TileLayoutRepositionEvent,
  TileStrictPosition,
} from "@progress/kendo-react-layout";
import Tile from "../components/dashboard/Tile";
import DevBirthdayCountdown from "../components/DevBirthdayCountdown";
import { useAuth } from "../hooks/auth";
import { updateUserData } from "../service/userData";
import { defaultTileData } from "../const/common";
import { useNotification } from "../hooks/useNotification";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [tileData, setTileData] =
    useState<TileStrictPosition[]>(defaultTileData);

  const [tileDataToSave, setTileDataToSave] = useState<TileStrictPosition[]>(
    []
  );
  const { devUser, articles } = useDevData();
  const notify = useNotification();

  const [debouncedTileData] = useDebounce(tileDataToSave, 5000);

  const handleReposition = (e: TileLayoutRepositionEvent) => {
    setTileData(e.value);
    setTileDataToSave(e.value);
  };

  const pinnedArticles = useMemo(
    () =>
      articles.data.filter((a) => userData.data?.pinnedArticles.includes(a.id)),
    [articles.data, userData.data]
  );

  const tiles: TileLayoutItem[] = useMemo(
    () => [
      {
        header: "Dev Account",
        body: (
          <Tile metadata={{ loading: devUser.loading, error: devUser.error }}>
            {devUser.data && (
              <div className="d-flex h-100 justify-content-between">
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
              </div>
            )}
          </Tile>
        ),
      },
      {
        header: "Birthday",
        body: (
          <div className="d-flex justify-content-center">
            {devUser.data && (
              <DevBirthdayCountdown dateJoined={devUser.data.joined_at} />
            )}
          </div>
        ),
      },
      {
        header: `Pinned Posts (${pinnedArticles.length})`,
        body: (
          <div>
            {pinnedArticles.length > 0 ? (
              <div className="d-flex flex-column " style={{ gap: 16 }}>
                {pinnedArticles.slice(0, 5).map((a) => {
                  return (
                    <div
                      key={`${a.id}-${a.title}`}
                      className="p-3 border rounded-1 shadow-sm"
                    >
                      <a
                        className="fw-bold d-block mb-2 black-link"
                        href={a.url}
                      >
                        {a.title}
                      </a>
                      <div className="d-flex" style={{ gap: 16 }}>
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: 4 }}
                        >
                          <SvgIcon icon={svgIcons.eyeIcon} />
                          <div className="fw-bold small">
                            {a.page_views_count}
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: 4 }}
                        >
                          <SvgIcon icon={svgIcons.commentIcon} />
                          <div className="fw-bold small">
                            {a.comments_count}
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: 4 }}
                        >
                          <SvgIcon icon={svgIcons.thumbUpIcon} />
                          <div className="fw-bold small">
                            {a.public_reactions_count}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center py-5"
                style={{ gap: 16 }}
              >
                <div>
                  You don't have any pinned posts to display. Go to the Posts
                  page and select a few.
                </div>
                <Button
                  onClick={() => {
                    navigate("/articles");
                  }}
                >
                  Posts Page
                </Button>
              </div>
            )}
          </div>
        ),
      },
    ],
    [devUser, pinnedArticles, navigate]
  );

  useEffect(() => {
    (async () => {
      if (user && debouncedTileData.length > 0) {
        notify("info", "Updating your dashboard layout...");

        const res = await updateUserData(user.$id, {
          profileArrangement: debouncedTileData.map((td) => JSON.stringify(td)),
        });
        userData.setData((prev) =>
          prev ? { ...prev, profileArrangement: res.profileArrangement } : null
        );
        notify("success", "Dashboard layout updated successfully!");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTileData, user]);

  useEffect(() => {
    try {
      if (userData.data && userData.data.profileArrangement.length > 0) {
        setTileData(
          userData.data.profileArrangement.map((pa) => JSON.parse(pa))
        );
      } else throw new Error("Error parsing.");
    } catch {
      setTileData(defaultTileData);
    }
  }, [userData]);

  return (
    <div>
      <div className="">
        {tileData.length === tiles.length && (
          <TileLayout
            columns={4}
            rowHeight={255}
            positions={tileData}
            gap={{ rows: 10, columns: 10 }}
            items={tiles}
            onReposition={handleReposition}
          />
        )}
      </div>
    </div>
  );
}
