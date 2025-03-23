import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "@progress/kendo-react-layout";
import { Article } from "../types/dev";
import moment from "moment";
import { Button } from "@progress/kendo-react-buttons";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { LibrarySection } from "../types/appwrite";

interface Props {
  article: Article;
  onClickTag: (tag: string) => void;
  onClickUsername: (username: string) => void;
  libraryMode?: boolean;
  onClickBookmark?: () => void;
  librarySection?: LibrarySection;
}

export default function ArticleCard({
  article,
  onClickTag,
  onClickUsername,
  libraryMode = false,
  onClickBookmark,
  librarySection,
}: Props) {
  return (
    <Card>
      <CardImage src={article.cover_image} />
      <CardHeader
        className="d-flex w-100 align-items-center"
        style={{ gap: 16 }}
      >
        <CardTitle
          className="d-flex align-items-center w-100"
          style={{ gap: 8 }}
        >
          <a href={article.url} target="_blank">
            {article.title}
          </a>

          {libraryMode && (
            <Button
              togglable
              className="ms-auto"
              fillMode="clear"
              onClick={onClickBookmark}
            >
              {librarySection ? (
                <FaBookmark color={librarySection.bgColor} />
              ) : (
                <FaRegBookmark />
              )}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <p>{article.description}</p>
        <div className="d-flex flex-wrap">
          {article.tag_list?.map((t, idx) => {
            return (
              <span
                key={`${t}-${idx}`}
                className="badge bg-primary me-1 hover-underline"
                onClick={() => {
                  onClickTag(t);
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
                    onClickUsername(article.user.username);
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
  );
}
