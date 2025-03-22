import { Permission, Query, Role } from "appwrite";
import { config, databases } from "../lib/appwrite";
import { LibrarySection, LibrarySectionBody } from "../types/appwrite";

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
    userId,
    sectionBody,
    [
      Permission.read(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ]
  );

  return response;
};
