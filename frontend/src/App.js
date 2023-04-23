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
<<<<<<< HEAD
    getBoards()
    getBoards2()

=======
    fetch('http://localhost:8080/api/token/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'root',
    password: 'root'
  })
})
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('token', data.access);
  })
  .catch(error => console.error(error));

// Later, use the stored token to make a request to a protected endpoint
const token = localStorage.getItem('token');
fetch('http://localhost:8080/api/boards/by_name/q', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
>>>>>>> origin/develop
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
