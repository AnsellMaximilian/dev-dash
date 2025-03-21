import { createContext } from "react";
import { User } from "../../types/auth";
import { SingularData } from "../../types/common";
import { UserData } from "../../types/appwrite";

interface AuthContextType {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<User | null>;
  registerUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  logoutUser: () => Promise<void>;
  loading: boolean;
  userData: SingularData<UserData>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
