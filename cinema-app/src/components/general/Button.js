import 'normalize.css';
import React from 'react';


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
