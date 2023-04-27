import { flexbox } from '@mui/system';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar";
import './styles/App.css';


function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
