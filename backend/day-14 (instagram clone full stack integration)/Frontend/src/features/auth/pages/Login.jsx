import { useState } from "react";
import { Link } from "react-router";
import "../styles/form.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { user, loading, handleLogin } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(userName, password);

    navigate("/");

    setUserName("");
    setPassword("");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button primary-button">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Create an account.</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
