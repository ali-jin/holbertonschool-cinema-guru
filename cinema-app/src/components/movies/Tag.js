import './movies.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function Tag({ genre, filter, genres, setGenres }) {
    const [selected, setSelected] = useState(false);

    const handleTag = () => {
        if (selected) {
            setGenres(genres.filter((item) => item !== genre));
            setSelected(false);
        } else {
            setGenres([...genres, genre]);
            setSelected(true);
        }
    };

    return (
        <li
            className={`tag ${selected ? 'selected' : ''} ${filter ? 'filter-tag' : ''}`}
            onClick={handleTag}
        >
            {genre}
        </li>
    );
};

Tag.propTypes = {
    genre: PropTypes.string.isRequired,
    filter: PropTypes.bool,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    setGenres: PropTypes.func.isRequired,
};
