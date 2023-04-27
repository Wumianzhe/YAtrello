import React from 'react';
import ReactDOM from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import Root,{ loader as rootLoader} from './pages/Root';
import Contact from './pages/contact';
import ErrorPage from './pages/error-page';
import './styles/index.css'

export const routes = [
{
    path:"/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    children: [
        {
            path: "contacts/:contactId",
            element: <Contact />
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
