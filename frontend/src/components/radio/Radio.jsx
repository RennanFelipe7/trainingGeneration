import PropTypes from 'prop-types';
import './radio.css'
import React, {useRef} from 'react';
import checkImage from '../../images/check.png';

export const Radio = ({value, id, name, isSelected, handleSelect}) => {
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
            <label htmlFor={id} data-cy={id}>{value}</label>
            <input ref={inputRef} type="radio" value={value} name={name} id={id} className='radioReference' checked={isSelected} onChange={handleInputChange}/>
            <button type='button' className='radioFaker' onClick={handleButtonClick} data-cy={`button ${id}`}>
                {imageSrc && <img src={imageSrc} alt="" />}
            </button>
        </div>
    )
}

Radio.propTypes = {
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
};