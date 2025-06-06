import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Activity from '../Activity';
import './navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faStar, faClock } from '@fortawesome/free-solid-svg-icons';

export default function SideBar({ userUsername, setIsLoggedIn }) {
    const [selected, setSelected] = useState("home");
    const [small, setSmall] = useState(true);
    const [activities, setActivities] = useState([]);
    const [showActivities, setShowActivities] = useState(false);

    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const setPage = (pageName) => {
        setSelected(pageName);
        switch (pageName) {
            case "Home":
                navigate("/home");
                break;
            case "Favorites":
                navigate("/favorites");
                break;
            case "Watch Later":
                navigate("/watchlater");
                break;
            default:
                navigate("/");
                break;
        }
    };

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/activity', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setActivities(response.data);
            } catch (error) {
                console.error('Failed to fetch activities:', error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <nav
            className={`sidebar-nav ${small ? 'collapsed' : 'expanded'}`}
            onMouseEnter={() => setSmall(false)}
            onMouseLeave={() => setSmall(true)}
        >
            <ul className="navigation-list">
                <li
                    className={selected === "Home" ? "active" : ""}
                    onClick={() => setPage("Home")}
                >
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    {!small && <span className="text">Home</span>}
                </li>
                <li
                    className={selected === "Favorites" ? "active" : ""}
                    onClick={() => setPage("Favorites")}
                >
                    <FontAwesomeIcon icon={faStar} className="icon" />
                    {!small && <span className="text">Favorites</span>}
                </li>
                <li
                    className={selected === "Watch Later" ? "active" : ""}
                    onClick={() => setPage("Watch Later")}
                >
                    <FontAwesomeIcon icon={faClock} className="icon" />
                    {!small && <span className="text">Watch Later</span>}
                </li>
            </ul>

            {!small && (
                <>
                    <div className="activities-container">
                        <p className="activities-title">Latest Activities</p>
                        {showActivities && (
                            <ul className="activity-list">
                                {activities.slice(0, 10).map((activity, index) => (
                                    <Activity key={index} activity={activity} />
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </nav>
    );
}
