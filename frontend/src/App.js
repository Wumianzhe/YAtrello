import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
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
  }, []);
  return (
    <div>
      {/* Render data when available */}
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
