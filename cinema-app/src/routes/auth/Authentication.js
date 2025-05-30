import './auth.css';
import React, { useState } from 'react';
import Login from "./Login.js";
import Register from "./Register.js";
import axios from "axios";


export default function Authentication({ setIsLoggedIn, setUserUsername }) {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (_switch) {
            axios.post('http://localhost:8000/api/auth/login', {
                username,
                password,
            })
                .then((response) => {
                    if (response.data.accessToken) {
                        localStorage.setItem('accessToken', response.data.accessToken);
                        setUserUsername(username);
                        setIsLoggedIn(true);
                    }
                });
        } else {
            axios.post('http://localhost:8000/api/auth/register', {
                username,
                password,
            })
                .then((response) => {
                    if (response.data.accessToken) {
                        localStorage.setItem('accessToken', response.data.accessToken);
                        setUserUsername(username);
                        setIsLoggedIn(true);
                    }
                })
                .catch((error) => {
                });
        }
    }
    return (
        <div className="auth">
            <form className="authentication" onSubmit={handleSubmit}>
                <ul>
                    <li
                        onClick={() => handleSwitch(true)}
                        className={_switch ? "active" : ""}
                    >
                        Sign in
                    </li>
                    <li
                        onClick={() => handleSwitch(false)}
                        className={!_switch ? "active" : ""}
                    >
                        Sign up
                    </li>
                </ul>
                {_switch ? (
                    <Login
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                    />
                ) : (
                    <Register
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                    />
                )}
            </form>
        </div>
    );
}
