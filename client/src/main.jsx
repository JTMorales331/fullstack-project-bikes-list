import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routing
import {
  ProtectedRoutes,
  UnAuthRoutes,
} from "../src/routing/ProtectedRoutes.jsx";

// Pages
import Main from "./pages/Main.jsx";
import SignIn from "./pages/SignIn.jsx";
import Register from "./pages/Register.jsx";

// Bikes
import CreateBike from "./pages/Bikes/Create.jsx";
import BikeDetails from "./pages/Bikes/Read.jsx";
import UpdateBike from "./pages/Bikes/Update.jsx";

// Misc
import ErrorBoundary from "./pages/ErrorBoundary.jsx";

// services
import { getBikeById } from "./services/bikes.js";


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "bikes/:id",
        element: <BikeDetails />,
        // use loader for static content. no need for loader
        loader: async ({ params }) => getBikeById(params.id),
        errorElement: <ErrorBoundary />
      },
      {
        element: <UnAuthRoutes />,
        children: [
          { path: "sign-in", element: <SignIn /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        element: <ProtectedRoutes />,
        children: [
          // { path: "dummy", element: <Dummy /> },
          { path: "bikes/create", element: <CreateBike /> },
          { 
            path: "bikes/:id/edit",
            element: <UpdateBike />,
            loader: async ({params}) => getBikeById(params.id),
            errorElement: <ErrorBoundary />
          },
          // { path: "sign-out", element: <SignOut /> },
        ],
      },
      {
        path: "*",
        element: <ErrorBoundary />,
      },
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
