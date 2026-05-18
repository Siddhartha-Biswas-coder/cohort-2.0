import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../styles/form.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { handleRegister, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister(username, email, password);

    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="toggle-auth-form" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
