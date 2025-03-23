import { ID, Permission, Query, Role } from "appwrite";
import { config, databases } from "../lib/appwrite";
import { LibrarySection, LibrarySectionBody } from "../types/appwrite";
import { Article } from "../types/dev";

export const createLibrary = async (
  userId: string,
  sectionBody: LibrarySectionBody
) => {
  const res = await databases.listDocuments(
    config.dbId,
    config.librarySectionCollectionId,
    [Query.equal("userId", userId)]
  );

  const existingSections = res.documents as LibrarySection[];

  if (existingSections.some((section) => section.name === sectionBody.name)) {
    throw new Error("Section with this name already exists");
  }

  if (
    existingSections.some((section) => section.bgColor === sectionBody.bgColor)
  ) {
    throw new Error("Section with this color already exists");
  }
  const response = await databases.createDocument(
    config.dbId,
    config.librarySectionCollectionId,
    ID.unique(),
    sectionBody,
    [
      Permission.read(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ]
  );

  return response;
};

export const getUserLibrary = async (userId: string) => {
  const res = await databases.listDocuments(
    config.dbId,
    config.librarySectionCollectionId,
    [Query.equal("userId", userId)]
  );

  return res.documents as LibrarySection[];
};

export const addArticleToSection = async (
  article: Article,
  newSection: LibrarySection,
  oldSection: LibrarySection | null
) => {
  // Remove from old section if there is any
  try {
    if (oldSection) {
      const oldSectionRes: LibrarySection = await databases.getDocument(
        config.dbId,
        config.librarySectionCollectionId,
        oldSection.$id
      );

      const newBody: Partial<LibrarySectionBody> = {
        articleIds: Array.from(
          new Set(oldSectionRes.articleIds.filter((id) => id !== article.id))
        ),
      };
      await databases.updateDocument(
        config.dbId,
        config.librarySectionCollectionId,
        oldSectionRes.$id,
        newBody
      );
    }
  } catch {
    throw new Error("Failed removing article from old section");
  }

  // add to the new library section
  const newSectionRes: LibrarySection = await databases.getDocument(
    config.dbId,
    config.librarySectionCollectionId,
    newSection.$id
  );
  const newBody: Partial<LibrarySectionBody> = {
    articleIds: Array.from(new Set([...newSectionRes.articleIds, article.id])),
  };
  await databases.updateDocument(
    config.dbId,
    config.librarySectionCollectionId,
    newSectionRes.$id,
    newBody
  );
};
