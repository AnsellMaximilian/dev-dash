import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useDev, useMaxData } from "../hooks/dev";
import { PageChangeEvent, Pager } from "@progress/kendo-react-data-tools";
import { useEffect, useMemo, useState } from "react";
import { Article } from "../types/dev";
import clsx from "clsx";
import { SvgIcon } from "@progress/kendo-react-common";
import * as icons from "@progress/kendo-svg-icons";
import { Button, FloatingActionButton } from "@progress/kendo-react-buttons";
import { useAuth } from "../hooks/auth";
import { updateUserData } from "../service/userData";
import { getCatchErrorMessage } from "../lib/utils/error";
import { useNotification } from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const { apiKey } = useDev();
  const { userData, user } = useAuth();

  const { data, fetchData, loading } = useMaxData<Article>(
    apiKey,
    "/articles/me/all"
  );
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);

  const notify = useNotification();
  const navigate = useNavigate();
  const pinnedArticleIds = userData.data?.pinnedArticles || [];

  const handlePageChange = (event: PageChangeEvent) => {
    setSkip(event.skip);
    setTake(event.take);
  };

  const pagedArticles = useMemo(
    () => data.slice(skip, skip + take),
    [skip, take, data]
  );

  const handleToggleArticlePin = async (id: number, pin: boolean) => {
    if (!user) return;
    try {
      const newPinnedIds = Array.from(
        new Set(
          pin
            ? [...pinnedArticleIds, id]
            : pinnedArticleIds.filter((aId) => aId !== id)
        )
      );
      await updateUserData(user.$id, {
        pinnedArticles: newPinnedIds,
      });

      userData.setData((prev) =>
        prev ? { ...prev, pinnedArticles: newPinnedIds } : prev
      );
      notify("success", "Updated pinned articles");
    } catch (error) {
      const msg = getCatchErrorMessage(error);
      notify("error", msg);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h1 className="h3">Articles</h1>
      <div>
        <Grid
          showLoader={loading}
          data={pagedArticles}
          style={{ height: "400px" }}
          resizable
          sortable
          onSortChange={(e) => {
            console.log({ sortE: e });
          }}
        >
          <GridColumn field="id" title="ID" width={100} />
          <GridColumn
            field="title"
            title="Title"
            cells={{
              data: ({ dataItem }) => {
                const article: Article = dataItem;
                return (
                  <td>
                    <a href={article.url} target="_blank">
                      {article.title}
                    </a>
                  </td>
                );
              },
            }}
          />
          <GridColumn
            field="published"
            title="Published"
            cells={{
              data: ({ field, dataItem }) => {
                const isPublished = field && dataItem[field];
                return (
                  <td>
                    <div className="d-flex align-items-center">
                      <div
                        className={clsx(
                          "rounded-pill px-2 py-1 small h-100",
                          isPublished
                            ? "bg-success text-bg-success"
                            : "bg-warning text-bg-warning"
                        )}
                        style={{
                          fontSize: "0.8rem",
                        }}
                      >
                        {isPublished ? "Published" : "Draft"}
                      </div>
                    </div>
                  </td>
                );
              },
            }}
          />
          <GridColumn
            title="Pinned"
            width={75}
            cells={{
              data: ({ dataItem }) => {
                const article: Article = dataItem;
                return (
                  <td>
                    <Button
                      togglable
                      selected={pinnedArticleIds.includes(article.id)}
                      onClick={() => {
                        handleToggleArticlePin(
                          article.id,
                          !pinnedArticleIds.includes(article.id)
                        );
                      }}
                    >
                      <SvgIcon icon={icons.pinIcon} />
                    </Button>
                  </td>
                );
              },
            }}
          />
        </Grid>
        <Pager
          skip={skip}
          take={take}
          pageSizeValue={take}
          pageSizes={[1, 5, 10]}
          type="input"
          previousNext={true}
          total={data.length}
          onPageChange={handlePageChange}
        />
      </div>

      <FloatingActionButton
        svgIcon={icons.plusIcon}
        onClick={() => {
          navigate("/articles/new");
        }}
      />
    </div>
  );
}
