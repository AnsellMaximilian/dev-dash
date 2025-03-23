import { ReactNode, useEffect, useState } from "react";
import { DevContext } from "./DevContext";
import { config, databases } from "../../lib/appwrite";
import { useAuth } from "../../hooks/auth";
import { useNotification } from "../../hooks/useNotification";
import { Models, Permission, Role } from "appwrite";

export const DevProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { user } = useAuth();
  const notify = useNotification();

  useEffect(() => {
    if (user) {
      (async () => {
        const storedKey = localStorage.getItem("apiKey");
        if (storedKey) {
          setApiKey(storedKey);
        } else {
          const userId = user.$id;

          try {
            const response = await databases.getDocument(
              config.dbId,
              config.apiKeyCollection,
              userId
            );

            const key = response.key as string | null;

            if (key) {
              setApiKey(key);
              localStorage.setItem("apiKey", key);
            }
          } catch {
            localStorage.removeItem("apiKey");
          }
        }

        setLoading(false);
      })();
    } else {
      setApiKey(null);
    }
  }, [user]);

  const submitApiKey = async (key: string) => {
    if (!user) {
      notify("error", "User not logged in");
      return;
    }

    const userId = user.$id;

    try {
      setLoading(true);
      let existingRow: Models.Document | null = null;

      try {
        existingRow = await databases.getDocument(
          config.dbId,
          config.apiKeyCollection,
          userId
        );
      } catch {
        notify("info", "No API key found... Submitting a new one.");
      }
      if (existingRow) {
        await databases.updateDocument(
          config.dbId,
          config.apiKeyCollection,
          userId,
          {
            key,
          }
        );
        notify("success", "Replaced your API key with a new one.");
      } else {
        await databases.createDocument(
          config.dbId,
          config.apiKeyCollection,
          userId,
          {
            key,
          },
          [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
          ]
        );
        notify("success", "Submitted your API key.");
      }

      setApiKey(key);
      localStorage.setItem("apiKey", key);
    } catch (error) {
      console.error(error);
      notify("error", "Error submitting API key to Appwrite");
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = async () => {
    if (!user) {
      notify("error", "User not logged in");
      return;
    }

    const userId = user.$id;

    try {
      await databases.deleteDocument(
        config.dbId,
        config.apiKeyCollection,
        userId
      );

      setApiKey(null);
      localStorage.removeItem("apiKey");
      notify("success", "API key deleted successfully!");
    } catch (error) {
      console.error(error);
      notify("error", "Error deleting API key from Appwrite");
    }
  };

  return (
    <DevContext.Provider
      value={{ apiKey, loading, submitApiKey, deleteApiKey }}
    >
      {children}
    </DevContext.Provider>
  );
};
