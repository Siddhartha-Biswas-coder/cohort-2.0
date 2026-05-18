import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "../styles/form.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error: ", err);
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
