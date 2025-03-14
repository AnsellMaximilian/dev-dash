import { ID } from "appwrite";
import { account } from "../lib/appwrite";

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const user = await account.create(ID.unique(), email, password, name);
  return user;
};

export const login = async (email: string, password: string) => {
  await account.createEmailPasswordSession(email, password);
  return getCurrentUser();
};

export const logout = async () => {
  await account.deleteSession("current");
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};
