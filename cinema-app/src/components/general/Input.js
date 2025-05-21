import 'normalize.css';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Input({
    label, type, className, value, setValue, icon=null, inputAttributtes={}
}) {
    const handleInput = (event) => {
        setValue(event.target.value);
    };
    return(
        <div className={className}>
            <label htmlFor={label}>
                {icon && <FontAwesomeIcon icon={icon} />}
            </label>
            <input 
                type={type}
                className={className}
                value={value}
                onChange={handleInput}
                id={label}
                {...inputAttributtes}
            />
        </div>
    );
};
