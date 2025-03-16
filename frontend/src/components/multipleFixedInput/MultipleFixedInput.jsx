import PropTypes from 'prop-types';
import './multipleFixedInput.css'
import {Checkbox} from '../checkbox/Checkbox.jsx'
import soundCheck from '../../sounds/check.mp3';
import { useSound } from '../../hooks/useSound.jsx';
import React, { useState } from 'react';

export const MultipleFixedInput = ({description, options}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const { playSound } = useSound(soundCheck);

    const handleSelect = (optionId) => {
        if (selectedOptions.includes(optionId)) {
            setSelectedOptions(selectedOptions.filter(id => id !== optionId));
        } else {
            setSelectedOptions([...selectedOptions, optionId]);
            playSound();
        }
    };

    return(
        <div className="parentDivOfAllCheckbox">
            <div className='descriptionCheckbox'><p data-cy={`multipleFixedInput ${description}`}>{description}</p></div>
            {options.map((option, index) => 
                <Checkbox 
                    key={index} 
                    {...option} 
                    isSelected={selectedOptions.includes(option.id)} 
                    handleSelect={() => handleSelect(option.id)} 
                />
            )}
        </div>
    )
}

MultipleFixedInput.propTypes = {
    description: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
};
