import React, { useState, useEffect } from 'react';
import {RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom";
import {privateRoutes} from "./router";
import Navbar from "./components/UI/Navbar";
import './styles/App.css';

const router = createBrowserRouter(privateRoutes);

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
      <Navbar/>
    </div>
  );
}

export default App;
