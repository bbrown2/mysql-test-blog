import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // create state to store current user in local storage
  // convert localStorage data into JSON object, localStorage value is string by default
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // we moved api request from login to authContext, this allow us to easily access user info upon login
  // login in user
  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    console.log(res.data);
    setCurrentUser(res.data);
  };

  // logout current user
  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  // update localStorage each time we change current user
  useEffect(() => {
    // convert object back into string
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]); // <-- when we change currentUser update

  return (
    // children --> App.js (we are wrapping this provider around the whole application to access user context)
    // we can use functions login, logout, and state currentUser anywhere in our app
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
