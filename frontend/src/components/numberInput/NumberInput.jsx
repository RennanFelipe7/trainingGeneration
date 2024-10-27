import PropTypes from 'prop-types';
import './NumberInput.css';
import upArrow from '../../images/upArrow.png';
import downArrow from '../../images/downArrow.png';
import React, { useState } from 'react';
import clickButton from '../../sounds/clickButton.mp3';
import { useSound } from '../../hooks/useSound.jsx';

export const NumberInput = ({id, description, step, placeholder, max, min, name }) => {

  const [value, setValor] = useState();
  const { playSound } = useSound(clickButton);

  const [styleBorderAlert, setStyleBorderAlert] = useState({});
  const [invalidInputAlertStyle, setInvalidInputAlertStyle] = useState({});

  const clampValue = (max, min) =>{
    if(value > max){
      setValor(max)
      setStyleBorderAlert({}); 
      setInvalidInputAlertStyle()
    }else if(value < min){
      setValor(min)
      setStyleBorderAlert({}); 
      setInvalidInputAlertStyle()
    }
  }

  const increase = () => {
    if(!value && value !== 0){
      playSound()
      setValor(step)
    }
    else if (value < max) {
      playSound()
      const newValue = parseFloat((value + step).toFixed(2));
      setValor(newValue);
      setStyleBorderAlert({}); 
      setInvalidInputAlertStyle({}); 
    }else{
      setStyleBorderAlert({ border: 'solid clamp(0.08rem, 0.2vw, 0.15rem) red' });
      setInvalidInputAlertStyle({ display : 'inline-flex' });
    }
  }; 

  const decrement = () => {
    if(!value && value !== 0){
        playSound()
        setValor(0)
    }
    else if (value > min) {
      playSound()
      const newValue = parseFloat((value - step).toFixed(2));
      setValor(newValue);
      setStyleBorderAlert({}); 
      setInvalidInputAlertStyle({}); 
    }else{
      setStyleBorderAlert({ border: 'solid clamp(0.08rem, 0.2vw, 0.15rem) red' });
      setInvalidInputAlertStyle({ display : 'inline-flex' });
    }
  };

  const normalizesValue = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setValor(newValue);
    }else{
        setValor()
    }
  };

  return (
    <div className='parentDivOfAllNumberInput'>
        <div className="containerLabelAndInput">
            <label htmlFor={id} className='description' data-cy={`numberInput ${id}`}>{description}</label>
            <input
              type="number"
              id={id}
              value={value}
              step={step}
              placeholder={placeholder}
              className='inputValue'
              name={name}
              onChange={(e) => {
                  normalizesValue(e);
                }}
              style={styleBorderAlert}
              onBlur={() => clampValue(max, min)}
              data-cy={`numberInput ${id} input`}
            />
            <p className='valueInvalid' style={invalidInputAlertStyle} data-cy={`alert numberInput ${id}`}>Valor inválido! máximo: {max} mínimo: {min}</p>
        </div>
        <div className='containeButtons'>
          <button type='button' onClick={increase} data-cy={`numberInput ${id} increase`}>
            {upArrow && <img src={upArrow} alt="" />}
          </button>
          <button type='button' onClick={decrement} data-cy={`numberInput ${id} decrement`}>
            {downArrow && <img src={downArrow} alt="" />}
          </button>
        </div>
    </div>
  );
};

NumberInput.propTypes = {
  description: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};
