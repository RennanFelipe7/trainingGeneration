import PropTypes from 'prop-types';
import './checkbox.css'
import React, {useRef} from 'react';
import checkImage from '../../images/check.png';

export const Checkbox = ({value, id, name, isSelected, handleSelect, checked}) => {
    const inputRef = useRef(null);

    const handleInputChange = () => {
        if (isSelected) {
            handleSelect(null);
        } else {
            handleSelect(id);
        }
    };

    const handleButtonClick = () => {
        handleInputChange();
        inputRef.current.checked = !isSelected;
    };

    let imageSrc;
    if (isSelected) {
        imageSrc = checkImage
    } else {
        imageSrc = null;
    }

    return(
        <div className='parentDivOfAllRadio'>
            <label htmlFor={id}>{value}</label>
            <input ref={inputRef} type="checkbox" value={value} name={name} id={id} checked={checked} className='checkboxReference' onChange={handleInputChange}/>
            <button type='button' className='checkboxFaker' onClick={handleButtonClick}>
                {imageSrc && <img src={imageSrc} alt="" />}
            </button>
        </div>
    )
}

Checkbox.propTypes = {
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
};