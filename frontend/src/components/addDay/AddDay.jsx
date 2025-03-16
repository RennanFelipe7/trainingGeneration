import PropTypes from 'prop-types';
import './addDay.css'
import { useEffect, useState } from 'react';

export const AddDay = ({options, choice}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        choice(selectedOption)
        setSelectedOption('')
    }, [selectedOption])
    
    const formatarDia = (dia) => {
        switch (dia) {
            case 'terca':
            return 'terça';
            case 'sabado':
            return 'sábado';
            default:
            return dia;
        }
    };
    
    return (
        <>
            {options.length > 0 && (
                <div className='parentDivOfAllAddDay'>
                    <div className="select-container" data-cy="AddDay">
                        <div className="select-option">
                            {selectedOption || "Adicionar dia"}
                        </div>
                        <div className="select-options">
                            {options.map((option, idx) => (
                                <div key={idx} className="select-option-itens">
                                    <button onClick={() => setSelectedOption(option)} data-cy={`AddDay ${formatarDia(option)}`}>{formatarDia(option)}</button>
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