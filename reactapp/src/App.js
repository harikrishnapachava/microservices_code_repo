import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data.message);
        setError(null);
      })
      .catch(error => {
        setError('Failed to fetch data from the backend.');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React App</h1>
        {error ? <p style={{ color: 'red' }}>{error}</p> : null}
        {data ? <p>Data from backend: {data}</p> : !error ? <p>Loading...</p> : null}
      </header>
    </div>
  );
}

export default App;