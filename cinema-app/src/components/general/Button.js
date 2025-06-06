import "./general.css";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Button({
    label, className='', onClick, icon=null
}) {
    return(
        <div className={className}>
            <button className={className} onClick={onClick}>
                {icon && <FontAwesomeIcon icon={icon} />}
                {label}
            </button>
        </div>
    );
};
