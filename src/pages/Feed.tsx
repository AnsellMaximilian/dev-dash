import { useEffect, useRef, useState } from "react";
import { useMaxData, usePaginatedData } from "../hooks/dev";
import { Article, Tag } from "../types/dev";
import * as icons from "@progress/kendo-svg-icons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardActions,
  TabStripSelectEventArguments,
  TabStrip,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { Skeleton } from "@progress/kendo-react-indicators";
import { Button } from "@progress/kendo-react-buttons";
import { AutoComplete } from "@progress/kendo-react-dropdowns";
import { Popup, PopupHandle } from "@progress/kendo-react-popup";
import { ColorPalette, TextBox } from "@progress/kendo-react-inputs";
import { libraryColors } from "../const/common";
import ArticleCard from "../components/ArticleCard";

export default function Feed() {
  const [page, setPage] = useState(1);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const popoverAnchor = useRef<HTMLDivElement>(null);
  const popupRef = useRef<PopupHandle | null>(null);
  const popupContainerRef = useRef<HTMLDivElement | null>(null);

  const [anchorArticle, setAnchorArticle] = useState<Article | null>(null);
  const [dialogArticle, setDialogArticle] = useState<Article | null>(null);

  const [tagSearchValue, setTagSearchValue] = useState("");

  const [tabSelected, setTabSelected] = useState<number>(0);

  // library section
  const [sectionColor, setSectionColor] = useState(libraryColors[0]);
  const [sectionName, setSectionName] = useState("");

  const handleTabSelect = (e: TabStripSelectEventArguments) => {
    setTabSelected(e.selected);
  };

  const { fetchData, data, loading } = usePaginatedData<Article>(
    null,
    "/articles",
    10,
    true
  );

  const { data: tags, fetchData: fetchTags } = useMaxData<Tag>(
    null,
    "/tags",
    undefined,
    true
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popoverAnchor.current &&
        popoverAnchor.current.contains(event.target as Node)
      ) {
        return;
      }

      if (
        popupContainerRef.current &&
        popupContainerRef.current.contains(event.target as Node)
      ) {
        return;
      }

      setTimeout(() => setAnchorArticle(null), 0);
    };

    if (anchorArticle) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [anchorArticle]);
  useEffect(() => {
    console.log("fetching data");
    fetchData(page, {
      tags: tagFilter.join(","),
      username: usernameFilter,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tagFilter, usernameFilter]);

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setAllArticles((prev) => [...prev, ...data]);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h1 className="h3">Feed</h1>
      <div className="row">
        <div className="d-flex flex-column col-8" style={{ gap: 16 }}>
          {allArticles.map((article, idx) => (
            <ArticleCard
              key={`${article.id}-${idx}`}
              onClickUsername={(u) => {
                setPage(1);
                setAllArticles([]);
                setUsernameFilter(u);
              }}
              article={article}
              onClickTag={(t) => {
                setPage(1);
                setAllArticles([]);
                setTagFilter((prev) => Array.from(new Set([...prev, t])));
              }}
            />
          ))}

          {loading && (
            <div className="d-flex flex-column" style={{ gap: 16 }}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} shape="rectangle" style={{ height: 200 }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} style={{ height: 10 }} />
        </div>
        <div className="col-4">
          <Card>
            <CardHeader>
              <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="mb-4">
                <div className="d-flex flex-column" style={{ gap: 16 }}>
                  <div className="d-flex" style={{ gap: 16 }}>
                    <AutoComplete
                      value={tagSearchValue}
                      onChange={(e) => setTagSearchValue(e.value)}
                      style={{ width: "300px" }}
                      data={tags
                        .map((t) => t.name)
                        .filter((t) => !tagFilter.includes(t))}
                    />
                    <Button
                      size="small"
                      themeColor="secondary"
                      onClick={() => {
                        setPage(1);
                        setAllArticles([]);
                        setTagFilter((prev) =>
                          Array.from(new Set([...prev, tagSearchValue]))
                        );
                        setTagSearchValue("");
                      }}
                    >
                      Add Tag Filter
                    </Button>
                  </div>

                  {usernameFilter && (
                    <div>
                      By:{" "}
                      <a
                        href={`http://dev.to/${usernameFilter}`}
                        target="_blank"
                      >
                        @{usernameFilter}
                      </a>
                    </div>
                  )}
                  {tagFilter.length > 0 && (
                    <div>
                      <div className="mb-1 fw-bold">Tags</div>
                      <div className="d-flex flex-wrap">
                        {tagFilter.map((t, idx) => (
                          <span
                            key={`${t}-${idx}`}
                            className="badge bg-primary me-1 hover-underline"
                            onClick={() => {
                              setPage(1);
                              setAllArticles([]);
                              setTagFilter((prev) =>
                                prev.filter((tag) => tag !== t)
                              );
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <CardActions>
                <Button
                  onClick={() => {
                    setPage(1);
                    setAllArticles([]);
                    setUsernameFilter("");
                    setTagFilter([]);
                  }}
                >
                  Clear Filter
                </Button>
              </CardActions>
            </CardBody>
          </Card>
        </div>
      </div>

      <Popup
        popupClass={"p-2 border mt-1"}
        ref={popupRef}
        popupAlign={{
          horizontal: "center",
          vertical: "top",
        }}
        show={!!anchorArticle}
        onClose={() => setAnchorArticle(null)}
        anchor={popoverAnchor.current || null}
      >
        <div ref={popupContainerRef} style={{ width: 200 }}>
          <Button
            fillMode="flat"
            className="w-100"
            svgIcon={icons.bookIcon}
            onClick={() => setDialogArticle(anchorArticle)}
          >
            Add to Library
          </Button>
        </div>
      </Popup>
      {dialogArticle && (
        <Dialog
          title={"Add Article to Library"}
          onClose={() => setDialogArticle(null)}
        >
          <TabStrip
            selected={tabSelected}
            onSelect={handleTabSelect}
            style={{ maxWidth: 700 }}
          >
            <TabStripTab title="Add To Section">
              <p>
                Baseball is a bat-and-ball game played between two teams of nine
                players each, who take turns batting and fielding.
              </p>
              <p>
                The batting team attempts to score runs by hitting a ball that
                is thrown by the pitcher with a bat swung by the batter, then
                running counter-clockwise around a series of four bases: first,
                second, third, and home plate. A run is scored when a player
                advances around the bases and returns to home plate.
              </p>
            </TabStripTab>
            <TabStripTab title="Create Section">
              <div className="d-flex flex-column custom-dialog">
                <div>
                  <div className="mb-1 fw-bold">Section Name</div>
                  <TextBox
                    type="text"
                    className="form-control"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.value as string)}
                  />
                </div>
                <div className="mb-2">
                  <div className="mb-1 fw-bold">Section Color</div>
                  <ColorPalette
                    palette={libraryColors}
                    tileSize={30}
                    value={sectionColor}
                    onChange={(e) => setSectionColor(e.value)}
                  />
                </div>

                {sectionColor && sectionColor && (
                  <div
                    className="p-3"
                    style={{
                      backgroundColor: sectionColor,
                      color: "white",
                      borderRadius: 4,
                    }}
                  >
                    <div className="mb-1 fw-bold text-center">
                      {sectionName}
                    </div>
                  </div>
                )}
              </div>
            </TabStripTab>
          </TabStrip>
          <DialogActionsBar>
            <Button type="button" onClick={() => setDialogArticle(null)}>
              No
            </Button>

            <Button
              disabled={
                tabSelected === 1 &&
                (sectionName.length < 5 ||
                  !sectionColor ||
                  sectionName.length > 20)
              }
              type="button"
              themeColor="primary"
              onClick={() => setDialogArticle(null)}
            >
              {tabSelected === 1
                ? "Create and Add to Section"
                : "Add to Section"}
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
}
