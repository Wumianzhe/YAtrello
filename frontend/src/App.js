import React, { useState, useEffect } from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar";
import SectionService from "./API/SectionService";
import BoardsService from "./API/BoardsService";
import BoardsList from "./API/BoardsList";
import SectionList from "./API/SectionList";

const  boardsService  =  new  BoardsService();

function App() {
  const [data, setData] = useState(null);

  async function getBoards2 () {
      const response = await BoardsService.getBoards2();
      console.log(response);
  }
  function getBoards () {
    boardsService.getBoards().then((result) => {
      console.log(result);
      //self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
    });
}
  //*
  useEffect(() => {
    getBoards()
    getBoards2()

  }, []);
  //*/
  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
        <SectionList/>
    </BrowserRouter>
    
  );
}

export default App;
