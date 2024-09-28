import PropTypes from 'prop-types';
import './freeInput.css'
import React, { useState } from 'react';

export const FreeInput = ({description, type, placeholder, id, name, min, max}) => {

    const [inputValue, setInputValue] = useState('');
    const [invalidInputAlertStyle, setInvalidInputAlertStyle] = useState({})
    const handleInputChange = (event) => {
        if(event.target.value.length > 70){
            setInvalidInputAlertStyle({display: 'block'})
            setInputValue(event.target.value.substring(0, max))
            setTimeout(() => {
                setInvalidInputAlertStyle({display: 'none'})
            }, 3000);
        }else{
            setInputValue(event.target.value);
        }
    };

    return(
        <div className='parentDivOfAllFreeInput'>
            <label className='description' htmlFor={id}>{description}</label>
            <input type={type} placeholder={placeholder} className='input' id={id} value={inputValue} name={name} onChange={handleInputChange} minLength={min} maxLength={max}/>
            <p className='valueInvalid' style={invalidInputAlertStyle}>Máximo de {max} caracteres alcançado</p>
        </div>
    )
}

FreeInput.propTypes = {
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};
