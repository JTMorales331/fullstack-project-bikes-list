import React from "react";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import { Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "./layouts/main";

const App = () => {
  return (
    // <Routes>
    //   <Route element={<MainLayout />} path="/">
    //     <Route element={<Main />} index />
    //     <Route element={<SignIn />} path="sign-in" />
    //   </Route>
    // </Routes>
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default App;
