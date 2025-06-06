import React from 'react';
import PropTypes from 'prop-types';
import './movies.css';
import SearchBar from '../general/SearchBar';
import Tag from './Tag';
import Input from '../general/Input';

export default function Filter({
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    sort,
    setSort,
    genres,
    setGenres,
    title,
    setTitle,
}) {
    const genreTags = [
        'Action', 'Drama', 'Comedy', 'Biography', 'Romance', 'Thriller', 'War',
        'History', 'Sport', 'Sci-Fi', 'Documentary', 'Crime', 'Fantasy'
    ];

    return (
        <div className="filter-container">
            <div className="filter-sort">
                <div className='search-bar'>
                    <SearchBar title={title} setTitle={setTitle} />
                </div>

                <div className="year-inputs">
                    <Input
                        label="Min Year"
                        type="number"
                        className="year-input"
                        value={minYear.toString()}
                        setValue={(value) => setMinYear(Number(value))}
                        inputAttributes={{ min: '1900', max: new Date().getFullYear().toString() }}
                    />
                    <Input
                        label="Max Year"
                        type="number"
                        className="year-input"
                        value={maxYear.toString()}
                        setValue={(value) => setMaxYear(Number(value))}
                        inputAttributes={{ min: '1900', max: new Date().getFullYear().toString() }}
                    />
                    <div className="sort-input">
                        <label>
                            Sort By:
                            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                                <option value="highestrated">Highest Rated</option>
                                <option value="lowestrated">Lowest Rated</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>

            <div className="filter-tags">
                {genreTags.map((genre) => (
                    <Tag
                        key={genre}
                        genre={genre}
                        filter={true}
                        genres={genres}
                        setGenres={setGenres}
                    />
                ))}
            </div>
        </div>
    );
}

Filter.propTypes = {
    minYear: PropTypes.number.isRequired,
    setMinYear: PropTypes.func.isRequired,
    maxYear: PropTypes.number.isRequired,
    setMaxYear: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    setGenres: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
};
