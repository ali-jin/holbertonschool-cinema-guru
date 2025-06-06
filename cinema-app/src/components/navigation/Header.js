import React from 'react';
import PropTypes from 'prop-types';
import './navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


export default function Header({ userUsername, setIsLoggedIn }) {
    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <nav className="header-nav">
            <span>Cinema Guru</span>
            <div>
                <img src="https://picsum.photos/100/100" alt="User Avatar" className="avatar" />
                <p>Welcome, {userUsername}!</p>
                <span className="logout" onClick={logout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                </span>
            </div>
        </nav>
    );
}

Header.propTypes = {
    userUsername: PropTypes.string.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired
};
