import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routing
import ProtectedRoutes from "../src/routing/ProtectedRoutes.jsx";

// Pages
import Main from "./pages/Main.jsx";
import SignIn from "./pages/SignIn.jsx";
import Register from "./pages/Register.jsx";
import Dummy from "./pages/Dummy.jsx";
import Form from "./pages/CreateForm.jsx"

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
        // loader: async () => {
        //   try {
        //     const response = await fetch("http://localhost:3000/api/bikes");
        //     return response.json();
        //   } catch (err) {
        //     throw new Error(err.message || "Failed to load the bikes")
        //   }
        // },
      },
      { path: "sign-in", element: <SignIn /> },
      { path: "register", element: <Register /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "dummy", element: <Dummy /> },
          { path: "bikes", element: <Form /> },
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
