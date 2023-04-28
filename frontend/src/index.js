import React from 'react';
import ReactDOM from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import Root,{ loader as rootLoader, action as rootAction} from './pages/Root';
import ErrorPage from './pages/error-page';

const routes = [
{
    path:"/",
    element: <Navbar />,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    action: rootAction,
    children: [
        {
            path:"users/:uid",
            element: <Profile/>
        },
        {
            path:"boards/:board_id",
            element: <Board/>
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
            element: <Main/>
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
