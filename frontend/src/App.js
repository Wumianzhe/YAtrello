import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Send GET request when component mounts
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => setData(data))
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
