import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("users/login", inputs);
      // MUST "await" function login when envoking
      await login(inputs);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(error.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <div>
          Don't have an account yet? <Link to="/register">Register</Link>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
