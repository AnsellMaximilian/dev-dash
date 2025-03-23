import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox } from "@progress/kendo-react-inputs";
import { register } from "../service/auth";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../hooks/useNotification";
import { getCatchErrorMessage } from "../lib/utils/error";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const notify = useNotification();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!email || !password || !name)
        throw new Error("Email, name, or password cannot be empty!");
      const user = await register(email, password, name);
      notify("success", `Registered as ${user.name}`);
      navigate("/login");
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

          <h1 className="mb-2 text-center h5">Create an Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <p>Name</p>
              <TextBox
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.value as string)}
              />
            </div>
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
              className="w-100"
              themeColor="primary"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Create Free Account"}
            </Button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
