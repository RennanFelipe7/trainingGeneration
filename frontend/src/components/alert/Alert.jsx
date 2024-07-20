import PropTypes from 'prop-types';
import './alert.css';
import close from '../../images/close.png';
import { useState } from 'react';

export const Alert = ({message, type }) => {
 
    const [style, setStyle] = useState({})

    const handleClose = () => {
        setStyle({display: 'none'})
    }

    return (
        <div className={`parentDivOfAllAlert ${type}`} style={style}>
            <div className='infoAndClose'>
                <div className='info'>
                    <p>
                        {message} 
                    </p>
                </div>
                <div className='close'>
                    <button onClick={handleClose}>
                        <img src={close} alt=""/>
                    </button>
                </div>
            </div>
            <div className='animation'>
                <div className='fill'></div>
            </div>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired
};
