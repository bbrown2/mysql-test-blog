import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Simple Blog</h1>
      <div>
        <Link to="/">
          <h6>HOME</h6>
        </Link>
        <Link to="/?cat=technology">
          <h6>TECHNOLOGY</h6>
        </Link>
        <Link to="/?cat=design">
          <h6>DESIGN</h6>
        </Link>
        <Link to="/?cat=food">
          <h6>FOOD</h6>
        </Link>
        {currentUser && (
          <p>
            Welcome, <b>{currentUser?.username}</b>
          </p>
        )}

        {currentUser ? (
          <>
            <button onClick={handleLogout}>Log out</button>
            <Link to="/write">
              <h6>WRITE</h6>
            </Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
