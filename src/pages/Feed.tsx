import { use, useEffect, useRef, useState } from "react";
import { useMaxData, usePaginatedData } from "../hooks/dev";
import { Article, Tag } from "../types/dev";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardImage,
  CardFooter,
  CardActions,
} from "@progress/kendo-react-layout";
import moment from "moment";
import { Skeleton } from "@progress/kendo-react-indicators";
import { Button } from "@progress/kendo-react-buttons";

export default function Feed() {
  const [page, setPage] = useState(1);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

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
            <Card key={`${article.id}-${idx}`}>
              <CardImage src={article.cover_image} />
              <CardHeader>
                <CardTitle>
                  <a href={article.url} target="_blank">
                    {article.title}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <p>{article.description}</p>
                <div className="d-flex flex-wrap">
                  {article.tag_list.map((t, idx) => {
                    return (
                      <span
                        key={`${t}-${idx}`}
                        className="badge bg-primary me-1 hover-underline"
                        onClick={() => {
                          setPage(1);
                          setAllArticles([]);
                          setTagFilter((prev) =>
                            Array.from(new Set([...prev, t]))
                          );
                        }}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              </CardBody>
              <CardFooter>
                <div className="d-flex">
                  <div className="ms-auto d-flex align-items-center gap-2">
                    <img
                      src={article.user.profile_image}
                      alt="User"
                      style={{ width: 40 }}
                      className="rounded-circle"
                    />
                    <div style={{ lineHeight: 1.2 }}>
                      <div className="fw-bold">
                        <div
                          className="hover-underline"
                          onClick={() => {
                            setPage(1);
                            setAllArticles([]);
                            setUsernameFilter(article.user.username);
                          }}
                        >
                          {article.user.name}
                        </div>
                      </div>
                      <div className="small fs-6 text-muted">
                        {moment(article.published_at).format("DD MMM YY")}
                      </div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
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
                <div>
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
                      <div>Tags</div>
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
    </div>
  );
}
