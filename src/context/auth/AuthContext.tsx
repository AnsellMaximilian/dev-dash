import { createContext } from "react";
import { User } from "../../types/auth";

interface AuthContextType {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  logoutUser: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
