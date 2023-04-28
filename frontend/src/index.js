import React from 'react';
import ReactDOM from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import Root,{ loader as rootLoader, action as rootAction} from './pages/Root';
import Contact, {loader as contactLoader} from './pages/contact';
import EditContact from './pages/edit';
import ErrorPage from './pages/error-page';
import './styles/index.css'

export const routes = [
{
    path:"/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    action: rootAction,
    children: [
        {
            path: "contacts/:contactId",
            loader: contactLoader,
            element: <Contact />
        },
        {
            path: "contacts/:contactId/edit",
            element: <EditContact/>,
            loader: contactLoader,
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
