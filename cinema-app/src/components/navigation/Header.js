import './navigation.css';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


export default function Header({ userUsername, setIsLoggedIn }) {
    const logout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    return (
        <nav className="header">
            <h1>Cinema Guru</h1>
            <img src="https://picsum.photos/100/100" alt="avatar" />
            <p>Welcome, {setUsername}!</p>
            <span onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </span>
        </nav>
    );
};
