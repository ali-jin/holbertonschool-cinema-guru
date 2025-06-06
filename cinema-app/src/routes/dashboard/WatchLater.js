import React, { useState, useEffect } from 'react';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import axios from 'axios';

export default function WatchLater() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchWatchLaterMovies = async () => {
            const token = localStorage.getItem('accessToken');

            try {
                const response = await axios.get('http://localhost:8000/api/titles/watchlater/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                setMovies(response.data);
            } catch (error) {
                console.error('Failed to fetch watch later movies:', error);
            }
        };

        fetchWatchLaterMovies();
    }, []);

    return (
        <div className="favorites-container">
            <p className='favorites-title'>MOVIES TO WATCH LATER</p>

            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbId} movie={movie} />
                ))}
            </div>
        </div>
    );
}
