import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox } from "@progress/kendo-react-inputs";
import { login } from "../service/auth";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useNotification } from "../hooks/useNotification";
import { getCatchErrorMessage } from "../lib/utils/error";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const notify = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!email || !password)
        throw new Error("Email or password cannot be empty!");
      const user = await login(email, password);

      if (user) {
        notify("success", `Logged in as ${user.name}`);
      } else {
        notify("error", "Failed to log in.");
      }
    } catch (error) {
      notify("error", getCatchErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center container-fluid vh-100 w-100 bg-light">
      <div className="card w-50 pt-4 pb-2 shadow-sm" style={{ maxWidth: 1024 }}>
        <div className="card-body">
          <img
            src={logo}
            alt="Dev Dash Logo"
            className="mb-4 mx-auto d-block"
            style={{ width: "150px" }}
          />

          <h1 className="mb-2 text-center h5">Sign in to Your Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <p>Email</p>
              <TextBox
                placeholder="john.smith@example.com"
                value={email}
                onChange={(e) => setEmail(e.value as string)}
              />
            </div>
            <div className="mb-3">
              <p>Password</p>
              <TextBox
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.value as string)}
              />
            </div>
            <Button
              type={"submit"}
              className="btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
