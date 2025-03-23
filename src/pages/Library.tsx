import { useCallback, useEffect, useState } from "react";
import { useDev, useMaxData } from "../hooks/dev";
import { Article, ReadingListItem } from "../types/dev";
import { Skeleton } from "@progress/kendo-react-indicators";
import ArticleCard from "../components/ArticleCard";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@progress/kendo-react-layout";
import { Button, FloatingActionButton } from "@progress/kendo-react-buttons";
import * as icons from "@progress/kendo-svg-icons";
import { LibrarySection } from "../types/appwrite";
import { config, databases } from "../lib/appwrite";
import { Query } from "appwrite";
import { useAuth } from "../hooks/auth";
import { ColorPalette, TextBox } from "@progress/kendo-react-inputs";
import { libraryColors } from "../const/common";
import { addArticleToSection, createLibrary } from "../service/library";
import { useNotification } from "../hooks/useNotification";
import { getCatchErrorMessage } from "../lib/utils/error";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function Library() {
  const { apiKey } = useDev();
  const { user } = useAuth();
  const notify = useNotification();
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [selectedLibrarySectionColor, setSelectedLibrarySectionColor] =
    useState<string | undefined>(undefined);

  // create library
  const [sectionName, setSectionName] = useState("");
  const [createLibraryLoading, setCreateLibraryLoading] = useState(false);

  // add to library
  const [addToSectionLoading, setAddToSectionLoading] = useState(false);
  const [selectedSectionToAdd, setSelectedSectionToAdd] =
    useState<LibrarySection | null>(null);

  const { data, loading, fetchData } = useMaxData<ReadingListItem>(
    apiKey,
    "/readinglist"
  );

  const fetchLibrarySections = useCallback(async () => {
    if (!user) return [];
    const response = await databases.listDocuments(
      config.dbId,
      config.librarySectionCollectionId,
      [Query.equal("userId", user.$id)]
    );
    return response.documents as LibrarySection[];
  }, [user]);
  const { data: libraryData, fetchData: fetchLibraryData } =
    useMaxData<LibrarySection>(null, "", fetchLibrarySections);

  const handleCreateLibrary = async () => {
    if (!user) return;
    setCreateLibraryLoading(true);
    try {
      if (!sectionName) throw new Error("Section name is required");
      if (!selectedLibrarySectionColor)
        throw new Error("Section color is required");
      await createLibrary(user.$id, {
        name: sectionName,
        bgColor: selectedLibrarySectionColor as string,
        articleIds: [],
        userId: user.$id,
      });
      fetchLibraryData();
      notify("success", "Library section created successfully");
    } catch (error) {
      notify("error", getCatchErrorMessage(error));
    } finally {
      setCreateLibraryLoading(false);
      setSectionName("");
    }
  };

  const handleAddToSection = async () => {
    if (!user || !activeArticle || !selectedSectionToAdd) return;

    const oldSection =
      libraryData.find((ld) => ld.articleIds.includes(activeArticle.id)) ||
      null;
    setAddToSectionLoading(true);
    try {
      await addArticleToSection(
        activeArticle,
        selectedSectionToAdd,
        oldSection
      );
      fetchLibraryData();
      notify("success", "Added to section successfully");
    } catch (error) {
      notify("error", getCatchErrorMessage(error));
    } finally {
      setAddToSectionLoading(false);
      setActiveArticle(null);
      setSelectedSectionToAdd(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchLibraryData();
  }, [fetchLibraryData]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log({ libraryData, libraryLoading, fetchLibraryData, libraryError });
  const selectedLibrarySection: LibrarySection | null =
    libraryData.find((data) => data.bgColor === selectedLibrarySectionColor) ||
    null;

  const librarySectionItems: ReadingListItem[] = data
    ? data.filter((item) =>
        selectedLibrarySection?.articleIds.includes(item.article.id)
      )
    : [];

  const itemsToRender = selectedLibrarySectionColor
    ? librarySectionItems
    : data;

  console.log({
    selectedLibrarySectionColor,
    selectedLibrarySection,
    librarySectionItems,
    itemsToRender,
  });
  return (
    <div>
      <div className="row">
        <div className="col-8 d-flex justify-content-between align-items-center">
          <h1 className="h3">Reading List</h1>
          {selectedLibrarySection && (
            <Button
              onClick={() => setSelectedLibrarySectionColor(undefined)}
              svgIcon={icons.xIcon}
              size="small"
              className="text-white"
              style={{
                backgroundColor: selectedLibrarySection.bgColor,
              }}
            >
              {selectedLibrarySection.name} Library Section
            </Button>
          )}
        </div>
      </div>
      <div className="row">
        <div className="d-flex flex-column col-8" style={{ gap: 16 }}>
          {loading ? (
            Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton key={idx} shape="rectangle" style={{ height: 200 }} />
            ))
          ) : selectedLibrarySectionColor && !selectedLibrarySection ? (
            <div>
              <Card>
                <CardBody>
                  <div className="py-4">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ gap: 8 }}
                    >
                      <div
                        style={{
                          width: 25,
                          height: 25,
                          backgroundColor: selectedLibrarySectionColor,
                        }}
                        className="rounded-circle"
                      />
                      <h4 className="text-center">
                        This Section Doesn't Exist Yet
                      </h4>
                    </div>
                    <p className="text-center">Would you like to create one?</p>
                    <div className="d-flex flex-column">
                      <div className="mb-2">
                        <div className="mb-1 fw-bold">Section Name</div>
                        <TextBox
                          type="text"
                          className="form-control"
                          value={sectionName}
                          onChange={(e) => setSectionName(e.value as string)}
                        />
                      </div>
                      <div className="d-flex justify-content-end">
                        <Button
                          themeColor="primary"
                          disabled={createLibraryLoading}
                          onClick={handleCreateLibrary}
                        >
                          Create Section
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ) : itemsToRender.length === 0 ? (
            <Card>
              <CardBody>
                <div className="text-center py-4">No items to show</div>
              </CardBody>
            </Card>
          ) : (
            itemsToRender?.map((item, idx) => (
              <ArticleCard
                key={`${item.id}-${idx}`}
                article={item.article}
                onClickTag={(tag) => console.log(tag)}
                onClickUsername={(username) => console.log(username)}
                libraryMode
                librarySection={libraryData.find((data) =>
                  data.articleIds.includes(item.article.id)
                )}
                onClickBookmark={() => {
                  setActiveArticle(item.article);
                  console.log("Bookmark clicked");
                }}
              />
            ))
          )}
        </div>
        <div className="col-4">
          <Card>
            <CardHeader>
              <CardTitle>Library</CardTitle>
            </CardHeader>
            <CardBody>
              <div>
                <div className="mb-2">
                  <div className="mb-1 fw-bold">Select Library Section</div>
                  <ColorPalette
                    palette={libraryColors}
                    tileSize={30}
                    value={selectedLibrarySectionColor}
                    onChange={(e) =>
                      setSelectedLibrarySectionColor(
                        e.value === selectedLibrarySectionColor
                          ? undefined
                          : e.value
                      )
                    }
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      {showScrollTopButton && (
        <FloatingActionButton
          svgIcon={icons.chevronUpIcon}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {activeArticle && (
        <Dialog
          title={"Add Post to Section"}
          onClose={() => setActiveArticle(null)}
        >
          <div className="custom-dialog py-4">
            {libraryData.length > 0 ? (
              <div className="mb-2 text-center">
                <div className="mb-1 fw-bold h5">Select Library Section</div>
                <ColorPalette
                  palette={libraryData.map((d) => d.bgColor)}
                  tileSize={30}
                  value={selectedSectionToAdd?.bgColor || undefined}
                  onChange={(e) =>
                    setSelectedSectionToAdd(
                      libraryData.find((d) => d.bgColor === e.value) || null
                    )
                  }
                />

                {selectedSectionToAdd && (
                  <div
                    className="mt-4 h3 p-2 text-white fw-bold rounded-pill"
                    style={{
                      backgroundColor: selectedSectionToAdd.bgColor,
                    }}
                  >
                    {selectedSectionToAdd.name}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-4 text-center">
                <div className="h4 mb-4">
                  Please Create at Least One Libray Section
                </div>
                <Button onClick={() => setActiveArticle(null)}>
                  I Understand
                </Button>
              </div>
            )}
          </div>
          {libraryData.length > 0 && (
            <DialogActionsBar>
              <Button type="button" onClick={() => setActiveArticle(null)}>
                Cancel
              </Button>

              <Button
                type="button"
                themeColor="primary"
                onClick={handleAddToSection}
                disabled={!selectedSectionToAdd || addToSectionLoading}
              >
                Add
              </Button>
            </DialogActionsBar>
          )}
        </Dialog>
      )}
    </div>
  );
}
