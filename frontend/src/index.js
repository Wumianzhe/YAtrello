import React from 'react';
import Board, { loader as boardLoader } from "./pages/BoardPH"
import Login from "./pages/LoginPH"
import Root from "./pages/Root"
import { hasJWT } from './API/Auth';
import Register from "./pages/RegisterPH"
import Profile, { loader as profileLoader } from "./pages/ProfilePH"
import Main from "./pages/DashboardPH"
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import ErrorPage from './pages/error-page';

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: () => {
      if (!hasJWT()) {
        throw redirect(`/login`)
      }
      return null
    },
    children: [
      {
        path: "users/:uid",
        element: <Profile />,
        loader: profileLoader
      },
      {
        path: "boards/:board_id",
        element: <Board />,
        loader: boardLoader
      },
      {
        path: "register",
        element: <Register />
      },
      {
        index: true,
        element: <Main />,
        // loader: mainLoader
      }, {
        path: "dashboard",
        element: <Main />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
]

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
