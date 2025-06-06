import React from 'react';
import PropTypes from 'prop-types';
import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Input({
    label,
    type,
    className,
    value,
    setValue,
    icon = null,
    inputAttributes = {}
}) {
    const handleInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className={`input-container ${className}`}>
            {label && <label>{label}:</label>}
            <div className="input-wrapper">
                {icon && <FontAwesomeIcon icon={icon} className="input-icon" />}
                <input
                    type={type}
                    className="input-field"
                    value={value}
                    onChange={handleInput}
                    {...inputAttributes}
                />
            </div>
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    icon: PropTypes.object,
    inputAttributes: PropTypes.object
};
