import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './auth.css';
import axios from 'axios';
import Login from './Login';
import Register from './Register';

export default function Authentication({ setIsLoggedIn = () => { }, setUserUsername = () => { } }) {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignInClick = () => {
        setSwitch(true);
    };
    const handleSignUpClick = () => {
        setSwitch(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let response;
            if (_switch) {
                response = await axios.post('http://localhost:8000/api/auth/login/', {
                    username,
                    password
                });
            } else {
                response = await axios.post('http://localhost:8000/api/auth/register/', {
                    username,
                    password
                });
            }
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            setIsLoggedIn(true);
            setUserUsername(username);
        } catch (err) {
            console.error('Error during authentication:', err);
        }
    }

    return (
        <div className="authentication-container">
            <div className="button-group">
                <button
                    onClick={handleSignInClick}
                    className={_switch ? "btn-active" : "btn-inactive"}
                >
                    Sign In
                </button>
                <button
                    onClick={handleSignUpClick}
                    className={!_switch ? "btn-active" : "btn-inactive"}
                >
                    Sign Up
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                {_switch ? (
                    <Login
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        handleSubmit={handleSubmit}
                    />
                ) : (
                    <Register
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        handleSubmit={handleSubmit}
                    />
                )}
            </form>
        </div>
    );
}

Authentication.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setUserUsername: PropTypes.func.isRequired
};
