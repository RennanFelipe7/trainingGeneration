import PropTypes from 'prop-types';
import './fixedInputWithOption.css'
import {Radio} from '../radio/Radio.jsx'
import soundCheck from '../../sounds/check.mp3';
import { useSound } from '../../hooks/useSound.jsx';
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const FixedInputWithOption = ({description, options: initialOptions}) => {
    
    const [selectedOption, setSelectedOption] = useState(null);
    const { playSound } = useSound(soundCheck);
    const [styleNewOption, setStyleNewOption] = useState({});
    const [styleButtonNewOption, setStyleButtonNewOption] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(initialOptions);
    const [changeBackgroundColorIfDisabled, setChangeBackgroundColorIfDisabledOrEnabled] = useState({});
    const inputRef = useRef();

    useEffect(() => {
        if (styleNewOption.display === 'flex') {
          inputRef.current.focus();
        }
    }, [styleNewOption]);

    const handleSelect = (optionId) => {
        setSelectedOption(optionId);
        playSound();
    };

    const newOptionInputAppears = () => {
        setStyleNewOption({ display : 'flex' })
        setStyleButtonNewOption({ display : 'none' })
    }

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if(newValue){
            setChangeBackgroundColorIfDisabledOrEnabled({backgroundColor: '#33C758', cursor: 'pointer'})
        }else{
            setChangeBackgroundColorIfDisabledOrEnabled({backgroundColor: 'grey', cursor: 'no-drop'})
        }
    };

    const handleButtonClick = () => {
        const newOptionId = uuidv4();
        const newOption = { id: newOptionId, value: inputValue.charAt(0).toUpperCase() + inputValue.slice(1)};
        setOptions([...options, newOption]);
        setSelectedOption(newOptionId);
        setStyleNewOption({ display : 'none' })
    };

    return(
        <div className="parentDivOfAllWithOption">
            <div className='descriptionRadioWithOption'><p>{description}</p></div>
            {options.map((option, index) => 
                <Radio 
                    key={index} 
                    {...option} 
                    isSelected={selectedOption === option.id} 
                    handleSelect={() => handleSelect(option.id)} 
                />
            )}
            <button type='button' className='createNewOption' onClick={newOptionInputAppears} style={styleButtonNewOption}>Nova opção</button>
            <div className='newOption' style={styleNewOption}>
                <input type="text" name="" id="" value={inputValue} onChange={handleChange} ref={inputRef}/>
                <button type='button' disabled={!inputValue} style={changeBackgroundColorIfDisabled} onClick={handleButtonClick}>Adicionar</button>
            </div>
        </div>
    )
}

FixedInputWithOption.propTypes = {
    description: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
};
