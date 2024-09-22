import PropTypes from 'prop-types';
import './addDay.css'
import { useEffect, useState } from 'react';

export const AddDay = ({options, choice}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        choice(selectedOption)
        setSelectedOption('')
    }, [selectedOption])
    
    return (
        <>
            {options.length > 0 && (
                <div className='parentDivOfAllAddDay'>
                    <div className="select-container">
                        <div className="select-option">
                            {selectedOption || "Adicionar dia"}
                        </div>
                        <div className="select-options">
                            {options.map((option, idx) => (
                                <div key={idx} className="select-option-itens">
                                    <button onClick={() => setSelectedOption(option)}>{option}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
    
}

AddDay.propTypes = {

};