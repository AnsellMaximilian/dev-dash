import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "./App.css";
import { AuthProvider } from "./context/auth/AuthContextProvider";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
