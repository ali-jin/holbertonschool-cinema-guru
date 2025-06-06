import React from 'react';
import PropTypes from 'prop-types';
import './general.css';


export default function SearchBar({
    title,
    setTitle
}) {
    const handleInput = (e) => {
        setTitle(e.target.value);
    };

    return (
        <input
            type="text"
            className="search-bar"
            placeholder="Search movies"
            value={title}
            onChange={handleInput}
        />
    );
};

SearchBar.propTypes = {
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired
};
