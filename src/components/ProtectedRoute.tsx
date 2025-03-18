import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import LoaderWithText from "./LoaderWithText";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
        <LoaderWithText title="Loading..." subtitle="Please wait..." />
      </div>
    );
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
