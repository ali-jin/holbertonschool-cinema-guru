import React from 'react';
import PropTypes from 'prop-types';
import './general.css';

export default function SelectInput({
    label,
    options,
    className,
    value,
    setValue
}) {
    const handleSelect = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className={`select-input ${className}`}>
            <label>{label}</label>
            <select
                className="select"
                value={value}
                onChange={handleSelect}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    );
}

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired,
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired
};
