import React, { useState, useEffect } from 'react';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import axios from 'axios';

export default function Favorites() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            const token = localStorage.getItem('accessToken');

            try {
                const response = await axios.get('http://localhost:8000/api/titles/favorite/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                setMovies(response.data);
            } catch (error) {
                console.error('Failed to fetch favorite movies:', error);
            }
        };

        fetchFavoriteMovies();
    }, []);

    return (
        <div className="favorites-container">
            <p className='favorites-title'>MOVIES YOU LIKE</p>

            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbId} movie={movie} />
                ))}
            </div>
        </div>
    );
}
