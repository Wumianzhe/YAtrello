import React from 'react';
import Board, {loader as boardLoader} from "./pages/BoardPH"
import Login from "./pages/LoginPH"
import Root from "./pages/Root"
import Register from "./pages/RegisterPH"
import Profile, {loader as profileLoader } from "./pages/ProfilePH"
import Main, {loader as mainLoader} from "./pages/DashboardPH"
import ReactDOM from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import ErrorPage from './pages/error-page';

const routes = [
{
    path:"/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
        {
            path:"users/:uid",
            element: <Profile/>,
            loader: profileLoader
        },
        {
            path:"boards/:board_id",
            element: <Board/>,
            loader: boardLoader
        },
        {
            path:"login",
            element: <Login/>
        },
        {
            path:"register",
            element: <Register/>
        },
        {
            path:"dashboard/:uid",
            element: <Main/>,
            loader: mainLoader
        }
    ]
},
]

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
);
