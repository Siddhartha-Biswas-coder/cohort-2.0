import { useState } from "react";
import { Link } from "react-router";
import "../styles/form.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const { user, loading, handleRegister } = useAuth();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister(userName, email, password);

    navigate("/");

    setUserName("");
    setEmail("");
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
        <h1>Register</h1>
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
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button primary-button">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
