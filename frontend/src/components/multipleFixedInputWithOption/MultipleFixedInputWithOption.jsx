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
    const [styleParentButtonNewOption, setStyleParentButtonNewOption] = useState({});
    const [styleButtonNewOption, setStyleButtonNewOption] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(initialOptions);
    const [changeBackgroundColorIfDisabled, setChangeBackgroundColorIfDisabledOrEnabled] = useState({});
    const inputRef = useRef();
    const { playSound } = useSound(soundCheck);
    const [maximumReached, setMaximumReached] = useState(false)
    const [title, setTitle] = useState('')
    const [titleCreateNewOption, setTitleCreateNewOption] = useState('Insira a nova opção para ' + description.replace(':', ''))

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
        setStyleParentButtonNewOption({ display: 'none' });
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (newValue) {
            setChangeBackgroundColorIfDisabledOrEnabled({ backgroundColor: '#33C758', cursor: 'pointer' });
            setTitleCreateNewOption('')
        } else {
            setChangeBackgroundColorIfDisabledOrEnabled({ backgroundColor: 'grey', cursor: 'no-drop' });
            setTitleCreateNewOption('Insira a nova opção para ' + description)
        }
    };

    const handleButtonClick = () => {
        const newOptionId = uuidv4();
        const newOption = { id: newOptionId, value: inputValue.charAt(0).toUpperCase() + inputValue.slice(1), checked:true, name: name};
        setOptions([...options, newOption]);
        setSelectedOptions([...selectedOptions, newOptionId]);
        setStyleNewOption({ display: 'none' });
        setStyleParentButtonNewOption({ display: 'block' });
        setInputValue('');
    };

    useEffect(() => {
        if(options.length >= 10){
            setMaximumReached(true)
            setTitle('Máximo de ' + description.replace(':', '') + ' alcançado')
            setStyleButtonNewOption({backgroundColor: 'grey', color: '#F2F2F2', cursor: 'no-drop'})
        }else{
            setMaximumReached(false)
            setTitle('')
            setStyleButtonNewOption({backgroundColor: '#F2F2F2', color: '#DAA520', cursor: 'pointer'})
        }
    }, [options])

    return (
        <div className="parentDivOfAllMultFixedWithOption">
            <div className='descriptionCheckbox'>
                <p>{description}</p>
            </div>
            <div>
                {options.map((option, index) =>
                    <div className='parentDivOfAllOptionCheckbox'>
                        <Checkbox
                            key={index}
                            {...option}
                            isSelected={selectedOptions.includes(option.id)}
                            handleSelect={() => handleSelect(option.id)}
                        />
                    </div>
                )}  
            </div>
            <div className='parentCreateNewOption' style={styleParentButtonNewOption}>
                <button type='button' className='createNewOption' onClick={newOptionInputAppears} disabled={maximumReached} title={title} style={styleButtonNewOption} data-cy={`button CreateNewOption ${description}`}>Nova opção</button>
            </div>
            <div className='newOption' style={styleNewOption}>
                <input type="text" name="" id="" value={inputValue} onChange={handleChange} ref={inputRef} maxLength={50} data-cy={`input CreateNewOption ${description}`}/>
                <button type='button' disabled={!inputValue} style={changeBackgroundColorIfDisabled} onClick={handleButtonClick} title={titleCreateNewOption} data-cy={`confirm CreateNewOption ${description}`}>Adicionar</button>
            </div>
        </div>
    );
};

MultipleFixedInputWithOption.propTypes = {
    description: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
};
