import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import LoaderWithText from "./LoaderWithText";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
        <LoaderWithText title="Loading..." subtitle="Please wait..." />
      </div>
    );
  if (user) return <Navigate to="/" />;

  return children;
};

export default PublicRoute;
