import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  // create state for user input fields
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [err, setErr] = useState("");

  // create function to update state as user types
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    // update all inputs fields using one object
    // take previous state and update object
    // use SPREAD operator (...) to update object values <-- unpacks object data
    setInputs((prev) => ({ ...prev, [e.target.value]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", inputs);
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErr(error.response.data);
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
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
          Already have an account? <Link to="/Login">Login</Link>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
