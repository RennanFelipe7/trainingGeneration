import PropTypes from 'prop-types';
import './freeInput.css'
import React, { useState } from 'react';

export const FreeInput = ({description, type, placeholder, id, name}) => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return(
        <div className='parentDivOfAllFreeInput'>
            <label className='description' htmlFor={id}>{description}</label>
            <input type={type} placeholder={placeholder} className='input' id={id} value={inputValue} name={name} onChange={handleInputChange}/>
        </div>
    )
}

FreeInput.propTypes = {
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string,
    name: PropTypes.string.isRequired
};
