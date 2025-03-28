import { Client, Account, Databases, Functions, Storage } from "appwrite";

export const config = {
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  dbId: String(import.meta.env.VITE_DB_ID),

  // collections
  apiKeyCollection: String(import.meta.env.VITE_API_KEY_COLLECTION_ID),
  devProxyFuncId: String(import.meta.env.VITE_DEV_PROXY_FUNCTION_ID),
  userDataCollectionId: String(import.meta.env.VITE_USER_DATA_COLLECTION_ID),
  librarySectionCollectionId: String(
    import.meta.env.VITE_LIBRARY_SECTION_COLLECTION_ID
  ),
};

export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(config.projectId);

export const account = new Account(client);

export const databases = new Databases(client);

export const functions = new Functions(client);
export const storage = new Storage(client);
