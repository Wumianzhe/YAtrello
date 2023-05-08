import React from 'react';
import Board, { loader as boardLoader } from "./pages/Board"
import Login from "./pages/Login"
import Root from "./pages/Root"
import { hasJWT } from './API/Auth';
import Register from "./pages/Register"
import Profile, { loader as profileLoader } from "./pages/Profile"
import FullWidthGrid, {loader as mainLoader, action as mainAction} from "./pages/Main"
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import ErrorPage from './pages/error-page';
import {action as loginAction} from "./pages/Login"
import {action as registerAction} from "./pages/Register"

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
        path: "users/:uid?",
        element: <Profile />,
        loader: profileLoader
      },
      {
        path: "boards/:board_id",
        element: <Board />,
        loader: boardLoader
      },
      {
        index: true,
        element: <FullWidthGrid />,
        loader: mainLoader,
        action: mainAction
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "register",
    element: <Register />,
    action: registerAction,
  },
]

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
