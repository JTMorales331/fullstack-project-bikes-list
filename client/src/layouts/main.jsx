import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function main({children}) {
  return (
    <>
      <NavBar />
      <div id="main-content">
        {/* <SignIn /> */}
        {/* <Outlet /> */}
        {children}
      </div>
      <Footer />
    </>
  );
}
