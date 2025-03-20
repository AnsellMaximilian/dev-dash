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
                    <PublicRoute>
                      <Settings />
                    </PublicRoute>
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
