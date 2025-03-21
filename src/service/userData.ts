import { Permission, Role } from "appwrite";
import { config, databases } from "../lib/appwrite";
import { UserData, UserDataBody } from "../types/appwrite";

export const updateUserData = async (
  userId: string,
  body: Partial<UserDataBody>
): Promise<UserData> => {
  try {
    const updatedUserData: UserData = await databases.updateDocument(
      config.dbId,
      config.userDataCollectionId,
      userId,
      body
    );

    return updatedUserData;
  } catch {
    const createdUserData: UserData = await databases.createDocument(
      config.dbId,
      config.userDataCollectionId,
      userId,
      body,
      [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    );

    return createdUserData;
  }
};
