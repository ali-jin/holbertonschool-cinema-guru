import React, { useState, useEffect } from 'react';
import './App.css';
import Authentication from './routes/auth/Authentication';
import axios from 'axios';
import Dashboard from './routes/dashboard/Dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axios.post('http://localhost:8000/api/auth/', {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(res => {
          setIsLoggedIn(true);
          setUsername(res.data.username);
        })
        .catch(err => {
          console.error('Authentication failed:', err);
        });
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard
          userUsername={username}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <Authentication
          setIsLoggedIn={setIsLoggedIn}
          setUserUsername={setUsername}
        />
      )}
    </div>
  );
}
