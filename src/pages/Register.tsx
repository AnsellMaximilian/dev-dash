import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox } from "@progress/kendo-react-inputs";
import { register } from "../service/auth";
import logo from "../assets/dev-dash-logo.svg";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await register(email, password, name);
      console.log("User registered:", user);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 pt-4 pb-2">
        <div className="card-body">
          <img
            src={logo}
            alt="Dev Dash Logo"
            className="mb-4 mx-auto d-block"
            style={{ width: "150px" }}
          />
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
            <Button type={"submit"} className="btn-primary w-100">
              Create Free Account
            </Button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
