import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "./App.css";
import { AuthProvider } from "./context/auth/AuthContextProvider";
import Register from "./pages/Register";
import { NotificationProvider } from "./context/notification/NotificationContextProvider";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoute";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { DevProvider } from "./context/dev/DevContextProvider";
import Settings from "./pages/Settings";
import { DevDataContextProvider } from "./context/dev/DevDataContextProvider";
import Articles from "./pages/Articles";
import CreateArticle from "./pages/CreateArticle";
import BadgeProgress from "./pages/BadgeProgress";
import PublicProfile from "./pages/PublicProfile";
import Feed from "./pages/Feed";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <DevProvider>
          <DevDataContextProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Dashboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />

                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Settings />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/badge-progress"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <BadgeProgress />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/public-profile"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <PublicProfile />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/articles"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Articles />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/articles/new"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CreateArticle />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/feed"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Feed />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </DevDataContextProvider>
        </DevProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
