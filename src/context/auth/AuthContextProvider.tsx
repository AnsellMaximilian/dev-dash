import { ReactNode, useEffect, useState } from "react";
import { getCurrentUser, login, logout, register } from "../../service/auth";
import { User } from "../../types/auth";
import { AuthContext } from "./AuthContext";
import { UserData } from "../../types/appwrite";
import { useSingleData } from "../../hooks/appwrite";
import { config } from "../../lib/appwrite";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userData = useSingleData<UserData>(
    config.userDataCollectionId,
    user?.$id
  );

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const loginUser = async (email: string, password: string) => {
    const loggedInUser = await login(email, password);
    setUser(loggedInUser);

    return loggedInUser;
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    const newUser = await register(email, password, name);
    setUser(newUser);
  };

  const logoutUser = async () => {
    await logout();
    localStorage.removeItem("apiKey");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, registerUser, logoutUser, loading, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
