import { Models } from "appwrite";

export interface AppwriteFuncResponse<T> {
  success: boolean;
  data: T;
}

export interface UserData extends Models.Document, UserDataBody {}

export interface UserDataBody {
  pinnedArticles: number[];
  profileArrangement: string[];
}

export interface LibrarySectionBody {
  name: string;
  bgColor: string;
  articleIds: number[];
  userId: string;
}

export interface LibrarySection extends Models.Document, LibrarySectionBody {}
