import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import unavailableImage from '../../assets/images/unavailable.png';
import axios from 'axios';

export default function MovieCard({ movie }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    const [imageSrc, setImageSrc] = useState(movie.imageurls?.[0] || unavailableImage);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchUserLists = async () => {
            try {
                const [favoritesRes, watchLaterRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/titles/favorite/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get('http://localhost:8000/api/titles/watchlater/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                ]);

                setIsFavorite(favoritesRes.data.some(favMovie => favMovie.imdbId === movie.imdbId));
                setIsWatchLater(watchLaterRes.data.some(watchMovie => watchMovie.imdbId === movie.imdbId));
            } catch (error) {
                console.error("Error fetching user's lists:", error);
            }
        };

        fetchUserLists();
    }, [movie.imdbId, token]);

    const handleClick = async (type) => {
        const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`;
        const isActive = type === 'favorite' ? isFavorite : isWatchLater;

        try {
            if (isActive) {
                await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post(url, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            if (type === 'favorite') {
                setIsFavorite(!isFavorite);
            } else if (type === 'watchlater') {
                setIsWatchLater(!isWatchLater);
            }
        } catch (error) {
            console.error(`Failed to update ${type} list for movie:`, error);
        }
    };

    return (
        <div className="movie-card">
            <div className="movie-image-container">
                <img
                    src={imageSrc}
                    alt={movie.title}
                    className="movie-image"
                    onError={() => setImageSrc(unavailableImage)}
                />
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-icons">
                    <FontAwesomeIcon
                        icon={faClock}
                        className={`icon watchlater-icon ${isWatchLater ? 'active' : ''}`}
                        onClick={() => handleClick('watchlater')}
                    />
                    <FontAwesomeIcon
                        icon={faStar}
                        className={`icon favorite-icon ${isFavorite ? 'active' : ''}`}
                        onClick={() => handleClick('favorite')}
                    />
                </div>
            </div>
            <div className="movie-synopsis-container">
                <p className="movie-synopsis">{movie.synopsis}</p>
            </div>
            <div className="movie-genres">
                {movie.genres.map((genre, index) => (
                    <span key={index} className="genre-tag">{genre}</span>
                ))}
            </div>
        </div>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        imdbId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        synopsis: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageurls: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};
