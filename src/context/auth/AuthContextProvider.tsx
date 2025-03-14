import { ReactNode, useEffect, useState } from "react";
import { getCurrentUser, login, logout, register } from "../../service/auth";
import { User } from "../../types/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const loginUser = async (email: string, password: string) => {
    const loggedInUser = await login(email, password);
    setUser(loggedInUser);
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
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, registerUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
