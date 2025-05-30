import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios.post("http://localhost:8000/api/auth/", {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        setIsLoggedIn(true);
        setUsername(response.data.username);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUsername("");
      });
  }, []);

  return isLoggedIn ? (
    <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <Authentication
      setIsLoggedIn={setIsLoggedIn}
      setUserUsername={setUsername}
    />
  );
}

export default App;
