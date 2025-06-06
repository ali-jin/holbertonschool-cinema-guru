import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './dashboard.css';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import HomePage from './HomePage';
import Favorites from './Favorites';
import WatchLater from './WatchLater';

export default function Dashboard({ userUsername, setIsLoggedIn }) {
    return (
        <Router>
            <div className="dashboard">
                <div className="header">
                    <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
                </div>
                <div className="sidebar">
                    <SideBar userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
                </div>
                <div className="main-content">
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/watchlater" element={<WatchLater />} />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

Dashboard.propTypes = {
    userUsername: PropTypes.string.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired
};
