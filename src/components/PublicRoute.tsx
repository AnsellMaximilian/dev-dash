import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/" />;

  return children;
};

export default PublicRoute;
