import PropTypes from 'prop-types';
import './fixedInput.css'
import {Radio} from '../radio/Radio.jsx'
import soundCheck from '../../sounds/check.mp3';
import { useSound } from '../../hooks/useSound.jsx';
import React, { useState } from 'react';

export const FixedInput = ({description, options}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const { playSound } = useSound(soundCheck);

    const handleSelect = (optionId) => {
        setSelectedOption(optionId);
        playSound();
    };

    return(
        <div className="parentDivOfAll">
            <div className='descriptionRadio'><p data-cy={`radio ${description}`}>{description}</p></div>
            <div className='radios'>
                {options.map((option, index) => 
                    <Radio 
                        key={index} 
                        {...option} 
                        isSelected={selectedOption === option.id} 
                        handleSelect={() => handleSelect(option.id)} 
                    />
                )}
            </div>
        </div>
    )
}

FixedInput.propTypes = {
    description: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
};
