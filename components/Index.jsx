import React from "react";
import { useSelector } from "react-redux";
import Login from "./auth/Login";
import Navigation from "./navigations/Navigation";

export default function Index() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? (
    <Navigation />
  ) : (
    <Login />
  );
}
