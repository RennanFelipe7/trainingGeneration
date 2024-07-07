import PropTypes from 'prop-types';
import './multipleFixedInputWithOption.css';
import { Checkbox } from '../checkbox/Checkbox.jsx';
import soundCheck from '../../sounds/check.mp3';
import { useSound } from '../../hooks/useSound.jsx';
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const MultipleFixedInputWithOption = ({description, options: initialOptions, name}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [styleNewOption, setStyleNewOption] = useState({});
    const [styleButtonNewOption, setStyleButtonNewOption] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(initialOptions);
    const [changeBackgroundColorIfDisabled, setChangeBackgroundColorIfDisabledOrEnabled] = useState({});
    const inputRef = useRef();
    const { playSound } = useSound(soundCheck);

    const handleSelect = (optionId) => {
        if (selectedOptions.includes(optionId)) {
            setSelectedOptions(selectedOptions.filter(id => id !== optionId));
        } else {
            setSelectedOptions([...selectedOptions, optionId]);
            playSound();
        }
    };

    useEffect(() => {
        if (styleNewOption.display === 'flex') {
            inputRef.current.focus();
        }
    }, [styleNewOption]);

    const newOptionInputAppears = () => {
        setStyleNewOption({ display: 'flex' });
        setStyleButtonNewOption({ display: 'none' });
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (newValue) {
            setChangeBackgroundColorIfDisabledOrEnabled({ backgroundColor: '#33C758', cursor: 'pointer' });
        } else {
            setChangeBackgroundColorIfDisabledOrEnabled({ backgroundColor: 'grey', cursor: 'no-drop' });
        }
    };

    const handleButtonClick = () => {
        const newOptionId = uuidv4();
        const newOption = { id: newOptionId, value: inputValue.charAt(0).toUpperCase() + inputValue.slice(1), checked:true, name: name};
        setOptions([...options, newOption]);
        setSelectedOptions([...selectedOptions, newOptionId]);
        setStyleNewOption({ display: 'none' });
        setStyleButtonNewOption({ display: 'block' });
        setInputValue('');
    };

    return (
        <div className="parentDivOfAllCheckbox">
            <div className='descriptionCheckbox'><p>{description}</p></div>
            {options.map((option, index) =>
                <Checkbox
                    key={index}
                    {...option}
                    isSelected={selectedOptions.includes(option.id)}
                    handleSelect={() => handleSelect(option.id)}
                />
            )}
            <button type='button' className='createNewOption' onClick={newOptionInputAppears} style={styleButtonNewOption}>Nova opção</button>
            <div className='newOption' style={styleNewOption}>
                <input type="text" name="" id="" value={inputValue} onChange={handleChange} ref={inputRef} />
                <button type='button' disabled={!inputValue} style={changeBackgroundColorIfDisabled} onClick={handleButtonClick}>Adicionar</button>
            </div>
        </div>
    );
};

MultipleFixedInputWithOption.propTypes = {
    description: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
};
