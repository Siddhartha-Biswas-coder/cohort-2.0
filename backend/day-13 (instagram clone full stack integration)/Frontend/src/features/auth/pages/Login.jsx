import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../styles/form.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading..</h1>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(username, password).then((res) => {
      console.log(res);
      navigate("/");
    });

    setUsername("");
    setPassword("");
  };

  return (
    <main>
      <div className="form-container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <form action="">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? Create an account{" "}
          <Link className="toggle-auth-form" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
